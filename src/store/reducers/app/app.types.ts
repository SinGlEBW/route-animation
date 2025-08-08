import { CONST_BY_PAGES } from 'src/CONTS/CONST_ROUTES';



type ActivitySlider_P = {
  keyName: keyof typeof CONST_BY_PAGES | '';
  from?: 'home' | 'menu' | '',
  titleHeader?: string;
}

export interface InitialStateProps {
  activitySlider: ActivitySlider_P;
}

