import React, { useState } from "react";
import { Card, Table } from "react-bootstrap";

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
        <Card.Img className="cardImg" src={data.thumbnail_url} alt="Streamer image" />
        {/* Infomation */}
        <Card.Body className="cardBody">
          <Card.Title>{data.title} </Card.Title>
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
                  ▲
                </button>
                <Table striped bordered hover variant="dark" size="sm">
                  <tbody>
                    <tr>
                      <td>Boradcaster ID</td>
                      <td className="infoTextData">{channelInfo.broadcaster_id}</td>
                    </tr>
                    <tr>
                      <td>Boradcaster Login</td>
                      <td className="infoTextData">{channelInfo.broadcaster_login}</td>
                    </tr>
                    <tr>
                      <td>Boradcaster Name</td>
                      <td className="infoTextData">{channelInfo.broadcaster_name}</td>
                    </tr>
                    <tr>
                      <td>Boradcaster Language</td>
                      <td className="infoTextData">{channelInfo.broadcaster_language}</td>
                    </tr>
                    <tr>
                      <td>Game ID</td>
                      <td className="infoTextData">{channelInfo.game_id}</td>
                    </tr>
                    <tr>
                      <td>Game Name</td>
                      <td className="infoTextData">{channelInfo.game_name}</td>
                    </tr>
                    <tr>
                      <td>Title</td>
                      <td className="infoTextData">{channelInfo.title}</td>
                    </tr>
                    <tr>
                      <td>Delay</td>
                      <td className="infoTextData">{channelInfo.delay}</td>
                    </tr>
                    <tr>
                      <td>Link</td>
                      <td className="infoTextData">
                        <a href={"https://www.twitch.tv/" + channelInfo.broadcaster_login}>
                          WATCH NOW!
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
                ▼
              </button>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default InfoCard;
