import { IconBellRinging } from "@tabler/icons-react";
import {
  IconCopy,
  IconLayoutDashboard,
  IconReport,
  IconDownload,
  IconPhone,
  IconTemplate,
  IconBook,
  IconBrandCampaignmonitor,
  IconUserMinus,
  IconUsersGroup,
  IconProgressCheck,
  IconUserUp,
  IconInfoHexagon,
  IconUserPlus,
  IconFriends,
  IconMan,
  IconClockX,
  IconMessage,
} from "@tabler/icons-react";
import { IconWoman } from "@tabler/icons-react";
const getMenuItems = (userTypeId) => [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: "dashboard",
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/home",
  },
  {
    id: "newregister",
    title: "New Register",
    icon: IconUserPlus,
    href: "/newregister",
  },
  {
    id: "married",
    title: "Married",
    icon: IconFriends,
    href: "/married",
  },
  {
    id: "male",
    title: "Male",
    icon: IconMan,
    href: "/male",
  },
  {
    id: "female",
    title: "Female",
    icon: IconWoman,
    href: "/female",
  },
  {
    id: "validity",
    title: "Validity",
    icon: IconClockX,
    href: "/validity",
  },
  {
    id: "feedback",
    title: "Feedback",
    icon: IconMessage,
    href: "/feedback",
  },
  {
    id: "notification",
    title: "Notification",
    icon: IconBellRinging,
    href: "/notification",
  },

  // {
  //   navlabel: true,
  //   subheader: "Contact",
  // },

  // {
  //   id: "contact",
  //   title: "Contact",
  //   icon: IconPhone,
  //   subItems: [
  //     {
  //       id: "sub-contact",
  //       title: "Contact",
  //       icon: IconPhone,
  //       href: "/Contact",
  //     },
  //     {
  //       id: "group",
  //       title: "Group",
  //       icon: IconUsersGroup,
  //       href: "/group",
  //     },
  //   ],
  // },

  // {
  //   navlabel: true,
  //   subheader: "Summary",
  // },
  // {
  //   id: "report",
  //   title: "Report",
  //   icon: IconReport,
  //   subItems: [
  //     {
  //       id: "read",
  //       title: "Read",
  //       icon: IconBook,
  //       href: "/report/read",
  //     },
  //     {
  //       id: "unsubscribe",
  //       title: "Unsubscribe",
  //       icon: IconUserMinus,
  //       href: "/report/unsubscribe",
  //     },
  //     {
  //       id: "Visited",
  //       title: "Visted/checked",
  //       icon: IconProgressCheck,
  //       href: "/report/visted",
  //     },
  //     {
  //       id: "campaignSent",
  //       title: "Campaign Sent",
  //       icon: IconUserUp,
  //       href: "/report/campaign",
  //     },
  //   ],
  // },

  // {
  //   id: "about",
  //   title: "About Developer",
  //   icon: IconInfoHexagon,
  //   href: "/developer",
  // },
];

export default getMenuItems;
