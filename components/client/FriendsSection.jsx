"use client";

import FriendRequest from "./FriendRequest";
import FriendCard from "./FriendCard";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useState } from "react";

import axios from "axios";

function FriendsSection({ pendingRequestsList, friendsList }) {
  const [pendingRequests, setPendingRequests] = useState(pendingRequestsList);
  const [friends, setFriends] = useState(friendsList);

  async function acceptFriendRequest(id) {
    try {
      axios.post("/api/friend/acceptfriend", {
        senderId: id,
      });
      setPendingRequests(
        pendingRequests.filter((request) => request.id !== id),
      );
      setFriends([
        ...friends,
        pendingRequests.find((request) => request.id === id),
      ]);
    } catch (error) {
      console.error(error);
    }
  }

  async function declineFriendRequest(id) {
    try {
      axios.post("/api/friend/declinefriend", {
        senderId: id,
      });
      setPendingRequests(
        pendingRequests.filter((request) => request.id !== id),
      );
    } catch (error) {
      console.error(error);
    }
  }

  async function deleteFriend(id) {
    try {
      axios.post("/api/friend/deletefriend", {
        friendId: id,
      });
      setFriends(friends.filter((friend) => friend.id !== id));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Tabs
      defaultValue="friends"
      className="mx-auto flex w-full flex-col items-center"
    >
      <TabsList className="grid w-full max-w-xl grid-cols-2 sm:h-14 sm:px-4">
        <TabsTrigger className="sm:text-xl" value="friends">
          Friends
        </TabsTrigger>
        <TabsTrigger className="sm:text-xl" value="requests">
          Requests
        </TabsTrigger>
      </TabsList>
      <TabsContent value="friends">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-3xl">Requests</h2>
          {pendingRequests.length > 0 ? (
            pendingRequests.map((sender) => (
              <FriendRequest
                key={sender.name}
                id={sender.id}
                acceptFriendRequest={acceptFriendRequest}
                declineFriendRequest={declineFriendRequest}
              >
                {sender.name}
              </FriendRequest>
            ))
          ) : (
            <span>No requests!</span>
          )}
        </div>
      </TabsContent>
      <TabsContent value="requests">
        <div className="flex flex-col items-center justify-center gap-3">
          <h2 className="text-center text-3xl">Friends</h2>
          {friends.length > 0 ? (
            friends.map((friend) => (
              <FriendCard
                id={friend.id}
                declineFriendRequest={deleteFriend}
                key={friend.name}
              >
                {friend.name}
              </FriendCard>
            ))
          ) : (
            <span>No friends!</span>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}

export default FriendsSection;
