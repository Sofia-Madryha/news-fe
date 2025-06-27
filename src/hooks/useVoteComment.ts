import { useEffect, useState } from "react";

import { patchCommentVotes } from "@/api";
import { useUserStore } from "@/store";

export const useVoteComment = (commentId: number, initialVotes: number) => {
  const [votes, setVotes] = useState<number>(0);
  const [isVoted, setIsVoted] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user } = useUserStore();

  useEffect(() => {
    setVotes(initialVotes);
    setIsVoted(false);
  }, [initialVotes, user, commentId]);

  const handleVoteComment = (
    e: React.MouseEvent<HTMLSpanElement>,
    direction: "up" | "down"
  ) => {
    e.stopPropagation();
    if (!user || isVoted) return;

    const inc = direction === "up" ? 1 : -1;

    setVotes((currentVotesCount) => currentVotesCount + inc);

    setIsVoted(true);

    patchCommentVotes(commentId, { inc_votes: inc }).catch(() => {
      setVotes((currentVotesCount) => currentVotesCount - inc);
      setIsVoted(false);
      setError("Your vote was not successful. Please try again!");
    });
  };

  return {
    votes,
    isVoted,
    error,
    canVote: !!user && !isVoted,
    voteUp: (e: React.MouseEvent<HTMLButtonElement>) =>
      handleVoteComment(e, "up"),
    voteDown: (e: React.MouseEvent<HTMLButtonElement>) =>
      handleVoteComment(e, "down"),
  };
};
