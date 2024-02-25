import { Interweave } from 'interweave';

export function Article({text}){
    return (
      <Interweave content={text} />
    )
  }