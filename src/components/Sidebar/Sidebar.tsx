import type { FC } from "react";
import { SidebarLink } from "./SidebarLink";
import "./SidebarFont.css";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Sidebar: FC<Props> = ({ open, setOpen }) => {
  return (
    <>
      <nav
        className={`
          fixed top-0 left-0 z-40
          h-screen w-full md:w-64
          bg-white border-r border-gray-300
          p-4 pt-6
          transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <h1 className="sidebar-title text-2xl text-gray-600 text-center py-8 mx-auto border-b-2 border-gray-300">TOOLSTATIX</h1>
        {/* <img src={img} alt="" width={180} height={180}/> */}
        <ul className="space-y-4 my-8"> 
          <li>
            {/* <SidebarLink to="/" icon={<img src={homeIcon} alt="" width={30} height={30}/>} label="Dashboard" onClick={() => setOpen(false)} /> */}
            <SidebarLink to="/" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -850 960 960" width="24px" fill="#00829c">
                  <path d="M240-200h120v-240h240v240h120v-360L480-740 240-560v360Zm-80 80v-480l320-240 320 240v480H520v-240h-80v240H160Zm320-350Z"/>
                </svg>
              } label="Dashboard" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/machine"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -850 960 960" width="24px" fill="#00829c">
                  <path d="M159-120v-120h124L181-574q-27-15-44.5-44T119-680q0-50 35-85t85-35q39 0 69.5 22.5T351-720h128v-40q0-17 11.5-28.5T519-800q9 0 17.5 4t14.5 12l68-64q9-9 21.5-11.5T665-856l156 72q12 6 16.5 17.5T837-744q-6 12-17.5 15.5T797-730l-144-66-94 88v56l94 86 144-66q11-5 23-1t17 15q6 12 1 23t-17 17l-156 74q-12 6-24.5 3.5T619-512l-68-64q-6 6-14.5 11t-17.5 5q-17 0-28.5-11.5T479-600v-40H351q-3 8-6.5 15t-9.5 15l200 370h144v120H159Zm80-520q17 0 28.5-11.5T279-680q0-17-11.5-28.5T239-720q-17 0-28.5 11.5T199-680q0 17 11.5 28.5T239-640Zm126 400h78L271-560h-4l98 320Zm78 0Z"/>
                </svg>
              }
            label="Machine" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/network-data-sources" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="#00829c">
                  <path d="M220-80q-58 0-99-41t-41-99q0-58 41-99t99-41q18 0 35 4.5t32 12.5l153-153v-110q-44-13-72-49.5T340-740q0-58 41-99t99-41q58 0 99 41t41 99q0 48-28 84.5T520-606v110l154 153q15-8 31.5-12.5T740-360q58 0 99 41t41 99q0 58-41 99t-99 41q-58 0-99-41t-41-99q0-18 4.5-35t12.5-32L480-424 343-287q8 15 12.5 32t4.5 35q0 58-41 99t-99 41Zm520-80q25 0 42.5-17.5T800-220q0-25-17.5-42.5T740-280q-25 0-42.5 17.5T680-220q0 25 17.5 42.5T740-160ZM480-680q25 0 42.5-17.5T540-740q0-25-17.5-42.5T480-800q-25 0-42.5 17.5T420-740q0 25 17.5 42.5T480-680ZM220-160q25 0 42.5-17.5T280-220q0-25-17.5-42.5T220-280q-25 0-42.5 17.5T160-220q0 25 17.5 42.5T220-160Z"/>
                </svg>
              }
            label="Network Data Source" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/main-tags" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="#00829c">
                  <path d="m620-284 56-56q6-6 6-14t-6-14L540-505q4-11 6-22t2-25q0-57-40.5-97.5T410-690q-17 0-34 4.5T343-673l94 94-56 56-94-94q-8 16-12.5 33t-4.5 34q0 57 40.5 97.5T408-412q13 0 24.5-2t22.5-6l137 136q6 6 14 6t14-6ZM480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z"/>
                </svg>
              }
            label="Main tags" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/related-tags" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="#00829c">
                  <path d="m260-520 220-360 220 360H260ZM700-80q-75 0-127.5-52.5T520-260q0-75 52.5-127.5T700-440q75 0 127.5 52.5T880-260q0 75-52.5 127.5T700-80Zm-580-20v-320h320v320H120Zm580-60q42 0 71-29t29-71q0-42-29-71t-71-29q-42 0-71 29t-29 71q0 42 29 71t71 29Zm-500-20h160v-160H200v160Zm202-420h156l-78-126-78 126Zm78 0ZM360-340Zm340 80Z"/>
                </svg>
              }
            label="Related tags" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/drivers" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="#00829c">
                  <path d="M440-183v-274L200-596v274l240 139Zm80 0 240-139v-274L520-457v274Zm-40-343 237-137-237-137-237 137 237 137ZM160-252q-19-11-29.5-29T120-321v-318q0-22 10.5-40t29.5-29l280-161q19-11 40-11t40 11l280 161q19 11 29.5 29t10.5 40v318q0 22-10.5 40T800-252L520-91q-19 11-40 11t-40-11L160-252Zm320-228Z"/>
                </svg>
              }
            label="Drivers" onClick={() => setOpen(false)} />
          </li>
          <li>
            <SidebarLink to="/settings" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -880 960 960" width="24px" fill="#00829c">
                  <path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm70-80h79l14-106q31-8 57.5-23.5T639-327l99 41 39-68-86-65q5-14 7-29.5t2-31.5q0-16-2-31.5t-7-29.5l86-65-39-68-99 42q-22-23-48.5-38.5T533-694l-13-106h-79l-14 106q-31 8-57.5 23.5T321-633l-99-41-39 68 86 64q-5 15-7 30t-2 32q0 16 2 31t7 30l-86 65 39 68 99-42q22 23 48.5 38.5T427-266l13 106Zm42-180q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Zm-2-140Z"/>
                </svg>
              }
            label="Settings" onClick={() => setOpen(false)} />
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Sidebar;
