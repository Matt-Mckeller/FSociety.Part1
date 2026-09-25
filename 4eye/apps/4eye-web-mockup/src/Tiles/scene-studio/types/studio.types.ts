export type AssetKind = 'image' | 'video';

export type AssetFolder =
  | '00_reference'
  | '01_scene_keyframes'
  | '02_s1c_gift_sequence'
  | '03_alternates_and_iterations'
  | '04_gallery'
  | '05_videos'
  | '06_edits'
  | '07_generated';

export interface StudioAsset {
  id: string;
  kind: AssetKind;
  display: {
    title: string;
    description: string;
    sceneCode?: string;
  };
  catalog: {
    order: number;
    starred: boolean;
    tags: string[];
    folder: AssetFolder;
  };
  origin: {
    source: 'imported' | 'generate' | 'animation' | 'edit' | 'frame-extract';
    model?: string;
  };
  file: {
    folder: AssetFolder;
    filename: string;
    url: string;
  };
  video?: {
    durationSec?: number;
    posterFilename?: string;
  };
}

export interface Storyboard {
  id: string;
  name: string;
  slug: string;
  sceneCode: string;
  description: string;
  frameIds: string[];
}

export type StudioView = 'gallery' | 'storyboard';

export const FOLDER_LABELS: Record<AssetFolder, string> = {
  '00_reference':               'Reference',
  '01_scene_keyframes':         'Scene Keyframes',
  '02_s1c_gift_sequence':       'Gift Sequence',
  '03_alternates_and_iterations': 'Alternates & Iterations',
  '04_gallery':                 'Gallery',
  '05_videos':                  'Videos',
  '06_edits':                   'Edits',
  '07_generated':               'Generated',
};
