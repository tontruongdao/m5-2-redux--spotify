import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchArtistProfile } from "../../api-helpers";

import {
  requestArtist,
  receiveArtist,
  receiveArtistError,
} from "../../actions";

const Artist = () => {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.token);
  const STATUS = useSelector((state) => state.artist.status);
  // const artistID = "0hprEC0nsWuQPSHag1O2Vi";
  const artist = useSelector((state) => state.artist.currentArtist);
  const { id } = useParams();

  React.useEffect(() => {
    if (!accessToken) {
      return;
    }
    try {
      dispatch(requestArtist());
      console.log(id, accessToken);
      fetchArtistProfile(accessToken, id).then((json) => {
        // console.log(json);
        dispatch(receiveArtist(json));
      });
    } catch (error) {
      console.log(error);
      dispatch(receiveArtistError());
    }
  }, [accessToken, id]);

  if (STATUS === "loading" || !artist) {
    return <h1>Loading Page...</h1>;
  }

  return (
    <div>
      <h1>{artist.name}</h1>
      <img src={artist.images[0].url} alt={artist.name} />
    </div>
  );
};

export default Artist;
