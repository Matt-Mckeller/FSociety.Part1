import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import type {
  Asset,
  Library,
  Browse,
  Sequence,
  CreateSequenceDto,
  UpdateSequenceDto,
  AddFrameDto,
} from '@4eye/scene-studio-shared';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['Library', 'Asset', 'Sequences'],
  endpoints: (b) => ({
    getLibrary: b.query<Library, void>({
      query: () => 'library',
      providesTags: ['Library'],
    }),
    updateAsset: b.mutation<Asset, { id: string; patch: Browse.UpdateAssetDto }>({
      query: ({ id, patch }) => ({
        url: `assets/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      // optimistic: server will also push via WS, but updating cache here keeps UI snappy
      async onQueryStarted({ id, patch }, { dispatch, queryFulfilled }) {
        const undo = dispatch(
          api.util.updateQueryData('getLibrary', undefined, (draft) => {
            const a = draft.assets.find((x) => x.id === id);
            if (!a) return;
            if (patch.display) Object.assign(a.display, patch.display);
            if (patch.catalog) Object.assign(a.catalog, patch.catalog);
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          undo.undo();
        }
      },
    }),
    reorder: b.mutation<{ ok: true }, Browse.ReorderDto>({
      query: (body) => ({ url: 'browse/reorder', method: 'POST', body }),
    }),
    bulkTag: b.mutation<Asset[], Browse.BulkTagDto>({
      query: (body) => ({ url: 'browse/bulk-tag', method: 'POST', body }),
    }),

    listSequences: b.query<Sequence[], void>({
      query: () => 'sequences',
      providesTags: (result) =>
        result
          ? [
              ...result.map((s) => ({ type: 'Sequences' as const, id: s.id })),
              { type: 'Sequences' as const, id: 'LIST' },
            ]
          : [{ type: 'Sequences' as const, id: 'LIST' }],
    }),
    createSequence: b.mutation<Sequence, CreateSequenceDto>({
      query: (body) => ({ url: 'sequences', method: 'POST', body }),
      invalidatesTags: [{ type: 'Sequences', id: 'LIST' }],
    }),
    updateSequence: b.mutation<Sequence, { id: string; patch: UpdateSequenceDto }>({
      query: ({ id, patch }) => ({ url: `sequences/${id}`, method: 'PATCH', body: patch }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Sequences', id }],
    }),
    reorderSequenceFrames: b.mutation<Sequence, { id: string; frameIds: string[] }>({
      query: ({ id, frameIds }) => ({
        url: `sequences/${id}/frames`,
        method: 'PUT',
        body: { frameIds },
      }),
      // optimistic update on the list cache so the timeline doesn't snap-back during drag
      async onQueryStarted({ id, frameIds }, { dispatch, queryFulfilled }) {
        const undo = dispatch(
          api.util.updateQueryData('listSequences', undefined, (draft) => {
            const s = draft.find((x) => x.id === id);
            if (s) s.frameIds = frameIds;
          }),
        );
        try {
          await queryFulfilled;
        } catch {
          undo.undo();
        }
      },
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Sequences', id }],
    }),
    addSequenceFrame: b.mutation<Sequence, { id: string; body: AddFrameDto }>({
      query: ({ id, body }) => ({ url: `sequences/${id}/frames`, method: 'POST', body }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Sequences', id }],
    }),
    removeSequenceFrame: b.mutation<Sequence, { id: string; assetId: string }>({
      query: ({ id, assetId }) => ({
        url: `sequences/${id}/frames/${assetId}`,
        method: 'DELETE',
      }),
      invalidatesTags: (_r, _e, { id }) => [{ type: 'Sequences', id }],
    }),
    deleteSequence: b.mutation<void, string>({
      query: (id) => ({ url: `sequences/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Sequences', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetLibraryQuery,
  useUpdateAssetMutation,
  useReorderMutation,
  useBulkTagMutation,
  useListSequencesQuery,
  useCreateSequenceMutation,
  useUpdateSequenceMutation,
  useReorderSequenceFramesMutation,
  useAddSequenceFrameMutation,
  useRemoveSequenceFrameMutation,
  useDeleteSequenceMutation,
} = api;
