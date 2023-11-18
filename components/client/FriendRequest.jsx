"use client";

import { Button } from "../ui/button";

function FriendRequest({
  children,
  acceptFriendRequest,
  id,
  declineFriendRequest,
}) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button type="button" onClick={() => acceptFriendRequest(id)}>
        Accept
      </Button>
      <span>{children}</span>
      <Button
        type="button"
        variant="destructive"
        onClick={() => declineFriendRequest(id)}
      >
        Decline
      </Button>
    </div>
  );
}

export default FriendRequest;
