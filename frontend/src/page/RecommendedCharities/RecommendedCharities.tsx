import React from "react";
import { useGiveBuddyStore } from '../../store/store';

const RecommendedCharities = () => {
  const [matched_charities] = useGiveBuddyStore(
    (state) => [state.matched_charities]
  )

  return (
    <div>
      {matched_charities?.map((c) => {
        return (
          <h1>{c.toString()}</h1>
        )
      })}
    </div>
  )
}

export default RecommendedCharities