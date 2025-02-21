import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    console.log('[API] Starting POST /api/storage/delete');

    // Get the session from cookies
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Create a service role client for storage operations
    const serviceClient = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      {
        auth: {
          persistSession: false,
        },
      }
    );

    // Get and validate request body
    const body = await request.json();
    const { filePath, bucket } = body;

    if (!filePath || !bucket) {
      return NextResponse.json(
        { error: 'File path and bucket are required' },
        { status: 400 }
      );
    }

    console.log('[API] Attempting to delete file:', { filePath, bucket });

    // Delete the file from storage
    const { error: deleteError, data } = await serviceClient.storage
      .from(bucket)
      .remove([filePath]);

    if (deleteError) {
      console.error('[API] Error deleting file:', deleteError);
      return NextResponse.json(
        { error: 'Failed to delete file', details: deleteError.message },
        { status: 500 }
      );
    }

    console.log('[API] File deleted successfully:', data);
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('[API] Unexpected error:', error);
    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
