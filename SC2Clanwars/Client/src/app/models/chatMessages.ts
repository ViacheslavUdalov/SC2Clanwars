export interface IChatUsers  {
  id: string,
  senderId: string,
  receiverId: string,
  timestamp: Date,
  message: string
}
export interface ITeamChat {
  id: string,
  user: string,
  timestamp: Date,
  message: string
}

