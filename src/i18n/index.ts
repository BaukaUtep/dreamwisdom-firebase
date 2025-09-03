import en from './en.json'
import ru from './ru.json'
import kk from './kk.json'
export type Lng='en'|'ru'|'kk'
export const dict:{[k in Lng]:any}={en,ru,kk}
export const t=(lng:Lng,key:string)=>key.split('.').reduce((a,k)=>a?.[k],dict[lng])||key
