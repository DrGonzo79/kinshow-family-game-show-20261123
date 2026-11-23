export type Story={id:string;relative:string;year:string;story:string;answer:string;approved:boolean};
export type Round={id:string;label:string;prompt:string;answer:string;cue:string};
export function buildShow(stories:Story[],format:string):Round[]{return stories.filter(s=>s.approved).map((s,i)=>({id:s.id,label:`Round ${i+1} · ${format}`,prompt:i%2===0?`What did Ruth always keep nearby in ${s.year}?`:`Which family legend happened in ${s.year}?`,answer:s.answer,cue:`After the guess, invite ${s.relative.split(" · ")[0]} to tell the full story.`}));}
