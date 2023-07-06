export interface IMessage {
  getTitle: () => string;
  getBody: () => string;
  getType: () => string;
  getData: () => { [key: string]: string };
  getNotification: () => { title: string; body: string };
}
