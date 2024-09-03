/* eslint-disable react/react-in-jsx-scope */
import { Backup, InstallMobile } from '@mui/icons-material';
import { SkillsBarSectionsInterface } from '../../../../typesDefs/components/pages/SkillsBar/types';
import DeveloperBoardIcon from '@mui/icons-material/DeveloperBoard';
import WebhookIcon from '@mui/icons-material/Webhook';
import FormatColorFillIcon from '@mui/icons-material/FormatColorFill';

export const SkillsBarSections: SkillsBarSectionsInterface[] = [
  {
    name: 'Front-End',
    icon: <DeveloperBoardIcon />,
    text: 'pages.home.skills.frontend',
    title: 'pages.home.skills.frontend.title'
  },
  {
    name: 'Mobile',
    icon: <InstallMobile />,
    text: 'pages.home.skills.mobile',
    title: 'pages.home.skills.mobile.title'
  },
  {
    name: 'Back-End',
    icon: <WebhookIcon />,
    text: 'pages.home.skills.backend',
    title: 'pages.home.skills.backend.title'
  },
  {
    name: 'CloudAndDevops',
    icon: <Backup />,
    text: 'pages.home.skills.cloudAndDevops',
    title: 'pages.home.skills.cloudAndDevops.title'
  },
  {
    name: 'VideoAndImageDesigner',
    icon: <FormatColorFillIcon />,
    text: 'pages.home.skills.videoAndImageDesigner',
    title: 'pages.home.skills.videoAndImageDesigner.title'
  }
];
