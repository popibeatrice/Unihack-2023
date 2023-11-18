"use client";

import { Button } from "../ui/button";

function FriendCard({ children, declineFriendRequest, id }) {
  return (
    <div className="flex items-center justify-center gap-3">
      <Button
        type="button"
        variant="destructive"
        onClick={() => declineFriendRequest(id)}
      >
        Remove
      </Button>
      <span>{children}</span>
    </div>
  );
}

export default FriendCard;
