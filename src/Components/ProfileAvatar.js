import { Card } from 'antd';
import "../Styles/scss/pages.css";

function ProfileAvatar(props) {
  return (
    <>
      <Card className="no-title">
            <img className="avatar-img" src="./assets/images/default_avartar.jpg" alt="" style={{borderRadius: "2px"}}/>
            <div>
                <label className="profile-name">{props.name}</label>
                <label className="text-muted">Woke: May 30, 2022</label>
                <div style={{display:"flex"}}>
                    <div className="medal-box">
                        <div className="medal gold"></div>
                        <span data-v-5c5a2954="" className="medal_count color-text-gold">9</span>
                    </div>
                    <div className="medal-box">
                        <div className="medal silver"></div>
                        <span data-v-5c5a2954="" className="medal_count color-text-silver">9</span>
                    </div>
                    <div className="medal-box">
                        <div className="medal bronze"></div>
                        <span data-v-5c5a2954="" className="medal_count color-text-bronze">9</span>
                    </div>
                </div>
            </div>
      </Card>
    </>
  );
}

export default ProfileAvatar;
