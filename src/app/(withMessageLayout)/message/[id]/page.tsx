
import MessageContainer from '@/components/modules/message/MessageContainer';
import React from 'react';

const SingleMessage = async ({ params,
}: {
    params: Promise<{ id: string }>;
}) => {
    const { id } = await params;
    return (
        <div>
            <div className="text-5xl">
                <MessageContainer id={id} />
            </div>
        </div>
    );
}

export default SingleMessage;
