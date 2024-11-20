import React from "react";
import logo from "../../assets/images/logo.png";
import AnimationButton from "../../common/AnimationButton";
import Modal from "react-modal";
import bgImage from "../../assets/images/waitlistBg.png";
import { ImCross } from "react-icons/im";
import userProfilePic from "../../assets/images/DefaultUserPic.svg";
import Crown from "../../assets/images/Crown.svg";
import { useNavigate } from "react-router-dom";
import useDisableScroll from "../../../../sipnPlay-ICP-frontend/src/utils/useDisableScroll";
import LeaderBoardList from "../LeaderboardList/LeaderboardList";

const GameDetails = ({ modalIsOpen, closeModal, game }) => {
  const navigate = useNavigate();
  useDisableScroll(modalIsOpen);

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Waitlist Modal"
      className="fixed inset-0 flex items-center justify-center bg-transparent"
      overlayClassName="fixed z-[100] inset-0 bg-gray-800 bg-opacity-50"
    >
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        className="bg-black w-[90%] text-white h-[87%] md:grid-cols-2 border border-[#696969] rounded-xl px-16 py-8 overflow-hidden"
      >
        <div className="flex justify-between items-center">
          <img
            className=" w-[150px] h-[50px] md:w-[160px] lg:w-[191px]"
            draggable="false"
            src={logo}
          />
          <ImCross onClick={closeModal} className="cursor-pointer" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 mt-8">
          <div className="pe-12">
            <div className="flex items-center justify-between mb-10">
              <div className="flex justify-between items-center gap-6">
                <img src={game.img} alt={game.name} className="h-[82px]" />
                <h3 className="font-monckeberg text-xl">{game.name}</h3>
              </div>
              <AnimationButton onClick={() => navigate(game.link)}>
                <p className="font-adam">PLAY NOW</p>
              </AnimationButton>
            </div>
            <div className="mb-12">
              <p className="font-monckeberg mb-4">ABOUT GAME:</p>
              <p className="font-adam text-white text-sm">{game.description}</p>
            </div>
            <div>
              <h4 className="font-monckeberg mb-4">HOW TO PLAY:</h4>
              <p className="font-adam text-white text-sm">{game.controls}</p>
            </div>
          </div>

          <div className="border-l-2 border-white ps-16 overflow-y-auto max-h-[70vh]">
            <h3 className="text-center mx-[9%] mb-32 font-monckeberg text-xl">
              Leaderboard
            </h3>
            <div className="flex justify-evenly">
              <div className="h-[132px] w-full mt-auto relative text-center pt-[45px] border border-[#EE3EC9]">
                <img
                  className="absolute rounded-full h-[60px] -top-8 left-[35%] border-[4px] border-gray-200"
                  src={userProfilePic}
                />
                <p className="font-adam font-[600]">Vatani</p>
                <p className="font-adam"> Level 3</p>
              </div>
              <div className="h-[172px] w-full relative text-center pt-[45px] border border-[#EE3EC9]">
                <div className="h-3/4">
                  <img
                    className="absolute rounded-full h-[90px] -top-12 left-[29%] border-[4px] border-yellow-400 "
                    src={userProfilePic}
                  />
                  <img
                    className="absolute h-[90px] -top-28 left-[29%]"
                    src={Crown}
                  />
                  <p className="font-adam mt-8 font-[600]">Vatani</p>
                  <p className="font-adam"> Level 3</p>
                </div>
              </div>
              <div className="h-1/2 w-full mt-auto relative text-center pt-8 border border-[#EE3EC9]">
                <img
                  className="absolute rounded-full h-[60px] -top-8 left-[35%] border-[4px] border-[#cd7f32] "
                  src={userProfilePic}
                />
                <p className="font-adam font-[600]">Vatani</p>
                <p className="font-adam"> Level 3</p>
              </div>
            </div>
            <div className="overflow-auto max-h-[400px]">
              {" "}
              {/* Added scroll */}
              <LeaderBoardList
                data={[
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                  {
                    principal:
                      "tugav-csyse-6r5qg-7ocfb-epxzf-lmtr5-mzhq3-ogrma-fjgnz-snohb-sae",
                    points: 1000,
                  },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default GameDetails;
