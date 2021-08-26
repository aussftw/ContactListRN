export interface ISettingOption {
  onPress: () => void;
  title: string;
  subTitle: string;
}

export interface IPrefOption {
  name: string;
  selected: boolean;
  onPress: () => void;
}
