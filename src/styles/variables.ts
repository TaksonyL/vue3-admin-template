import variables from './variables.module.scss';

type Variables = 'sideBarBg' | 'menuText' | 'menuActiveText' | 'subMenuActiveText' | 'menuBg' | 'menuHover' | 'subMenuBg' | 'subMenuHover'

export default variables as Record<Variables, string>
