import { FooterIcons } from '../../../../typesDefs/components/commonLayout/Footer/enums';
import { FooterSectionsInterface } from '../../../../typesDefs/components/commonLayout/Footer/types';
import { HeaderButtons } from '../Header/header';
import lawawitaIcon from '../../../../assets/pages/home/lawawitaLogoHorizontalDark.png';

export const FooterSections: Partial<FooterSectionsInterface>[] = [
  {
    name: 'info',
    title: 'pages.commonLayout.footer.info',
    text: 'pages.commonLayout.footer.infoText',
    itemsList: [
      {
        id: 'address',
        name: 'Mérida, Edo.Mérida, Venezuela',
        link: '/',
        icon: FooterIcons.Address,
        noTranslate: true
      },
      {
        id: 'phone',
        name: '+58 (424) 749-8567',
        link: '/',
        icon: FooterIcons.Phone,
        noTranslate: true
      },
      {
        id: 'email',
        name: 'andres@ac-dot.dev',
        link: '/',
        icon: FooterIcons.Email,
        noTranslate: true
      }
    ],
    hideInResponsive: true
  },
  {
    name: 'navigation',
    title: 'pages.commonLayout.footer.navigation',
    text: 'pages.commonLayout.footer.navigationText',
    itemsList: HeaderButtons,
    hideInResponsive: true
  }
];
