import Button from "@material-ui/core/Button";
import React from "react";

export default function LoadMore({onLoadMore,page}) {
  const handleLoadMore = () => {
    onLoadMore(page+1);
  };
  return (
    <div className="load-more">
    <Button  onClick={handleLoadMore} variant="contained">
      Load more comments
    </Button>
    </div>
  );
}
