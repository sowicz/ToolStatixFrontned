export interface TagSeries {
  min: number[];
  max: number[];
  avg: number[];
  work_time: number[];
}

export interface TagDataResponse {
  main_tag_id: number;
  data: Record<string, TagSeries>; 
}
