import React, { Fragment } from "react";

import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";

const Like = ({ isLiked, onFavClick }) => {
	return (
		<Fragment>
			{isLiked ? (
				<FavoriteIcon onClick={onFavClick} color="secondary" />
			) : (
				<FavoriteBorder onClick={onFavClick} color="primary" />
			)}
		</Fragment>
	);
};

export default Like;
