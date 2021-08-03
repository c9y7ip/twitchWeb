import React, { useState } from "react";
import { Card } from "react-bootstrap";

//Own component
import TwitchAPI from "./TwitchAPI";

//CSS import
import "../style/InfoCard.css";

const InfoCard = ({ data = {} }) => {
  const [toggleButton, setToggleButton] = useState(false);
  const [channelInfo, setChannelInfo] = useState({});
  return (
    <>
      <Card className="card">
        {/* Profile pic */}
        <Card.Img
          variant="top"
          className="cardImg"
          src={data.thumbnail_url}
          alt="Streamer image"
        ></Card.Img>
        {/* Infomation */}
        <Card.Body className="cardBody">
          <Card.Title>{data.title}</Card.Title>
          <Card.Text className="cardText">
            <span className="displayName">{data.display_name}</span> is playing{" "}
            <span className="gameName">{data.game_name}</span>
          </Card.Text>
          {/* Hided information */}
          <div className="additionInfo">
            {" "}
            {toggleButton ? (
              <>
                <button
                  className="cardButton"
                  onClick={() => {
                    setToggleButton(false);
                  }}
                >
                  -
                </button>

                <div>
                  <br />
                  <p className="infoText">
                    Boradcaster ID:{" "}
                    <span className="infoTextData">{channelInfo.broadcaster_id}</span>
                  </p>
                  <p className="infoText">
                    Boradcaster Login:{" "}
                    <span className="infoTextData">{channelInfo.broadcaster_login}</span>
                  </p>
                  <p className="infoText">
                    Boradcaster Name:{" "}
                    <span className="infoTextData">{channelInfo.broadcaster_name}</span>
                  </p>
                  <p className="infoText">
                    Boradcaster Language{" "}
                    <span className="infoTextData">{channelInfo.broadcaster_language}</span>
                  </p>
                  <p className="infoText">
                    Game ID: <span className="infoTextData">{channelInfo.game_id}</span>
                  </p>
                  <p className="infoText">
                    Game Name: <span className="infoTextData">{channelInfo.game_name}</span>
                  </p>
                  <p className="infoText">
                    Title: <span className="infoTextData">{channelInfo.title}</span>
                  </p>
                  <p className="infoText">
                    Delay: <span className="infoTextData">{channelInfo.delay}</span>
                  </p>
                </div>
              </>
            ) : (
              <button
                className="cardButton"
                onClick={() => {
                  setToggleButton(true);
                  TwitchAPI.getStreamInfo(data.id).then((res) => {
                    setChannelInfo(res.data.data[0]);
                  });
                }}
              >
                +
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default InfoCard;
