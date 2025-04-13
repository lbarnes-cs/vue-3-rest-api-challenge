import type { ProtocolsResponse } from '@/types/protocol/response';

export const mockProtocolsResponse: ProtocolsResponse = {
  items: [
    {
      acknowledgements: '',
      authors: [
        {
          affiliation: 'US Food and Drug Administration',
          image: {
            placeholder: null,
            source: null,
          },
          link: '',
          name: 'John Castle',
          username: 'john-castle',
        },
        {
          affiliation: 'US Food and Drug Administration',
          image: {
            placeholder: null,
            source: null,
          },
          link: null,
          name: 'Jane Smith',
          username: '',
        },
      ],
      before_start: '',
      created_on: 1707443266,
      creator: {
        affiliation: 'US Food and Drug Administration',
        image: {
          placeholder: null,
          source: null,
        },
        link: null,
        name: 'Jane Smith',
        username: 'jane--smith',
      },
      description:
        '{"blocks":[{"key":"fs8c8","text":"PURPOSE: to define the standard operating procedure for collecting isolate metadata using PulseNet 2.0 for submission of food/environmental isolates to NCBI.","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"bold","offset":0,"length":9}],"entityRanges":[],"data":{}},{"key":"c9i73","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"1hq4f","text":"SCOPE: to provide a standardized procedure to collect isolate metadata using PulseNet 2.0 for submission of food/environmental isolates to NCBI.","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"bold","offset":0,"length":7}],"entityRanges":[],"data":{}},{"key":"986bq","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2g47r","text":"RESPONSIBILITIES- SOP Responsible Officials: John Castle, Jane Smith","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"bold","offset":0,"length":16}],"entityRanges":[],"data":{}},{"key":"a4fj3","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"5iju1","text":"The GenomeTrakr Network Management will be responsible to monitor GenomeTrakr submissions processed through PulseNet 2.0 and ensure that all GT labs are familiar with the mandatory metadata fields required for submission of GenomeTrakr sequencing records to NCBI. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8fu1v","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"889k4","text":"V3:  Added dropdown menus from controlled vocabulary to sequenced by and project name to metadata template PulseNet_Bionumerics_Isolate_Metadata","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"italic","offset":107,"length":37}],"entityRanges":[],"data":{}},{"key":"b9k6i","text":"V4:  Changes in metadata template PulseNet_Bionumerics_Isolate_Metadata. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"style":"italic","offset":34,"length":37}],"entityRanges":[],"data":{}},{"key":"47cuq","text":"- Added dropdown menus from controlled vocabulary to collected_by ,  SourceCountryState","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7339b","text":"- Added fields: collected by, isolation source","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"dlg38","text":"- Added mapping table of attribute names.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ff6lp","text":"- Remove requirement to send biosample update to NCBI to make changes on sequenced by and project name. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"7lp9k","text":"V5: Changes implemented to handle NCBI submissions for GenomeTrakr through the PulseNet 2.0 platform. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"ebdun","text":"V6:  New version of spreadsheet with updated dropdown menu.  Add values to NCBI Templates","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"cbnfl","text":"V7: Add GMVS option to download metadata spreadsheet. Mapping serovar to serotype_wgs or serotype. ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"fc835","text":"V8: Add note on serovar mapping.  Serovar only maps to serotype_wgs when the WGS prediction for serotype is available.   Add PHL_ReceivedDate and WGS_Lab_ReceivedDate to metadata spreadsheet.   ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"17orf","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"bv2n8","text":" ","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"aqho","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      doi: 'dx.doi.org/10.17504/protocols.io.3byl4qn4ovo5/v6',
      guid: 'C3C569D303F711F08CBC0A58A9FEAC02',
      guidelines:
        '{"blocks":[{"key":"bc74c","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
      id: 124564,
      image: {
        placeholder: 'https://www.protocols.io/img/default_protocol.png',
        source: 'https://www.protocols.io/img/default_protocol.png',
      },
      link: '',
      materials: [],
      materials_text: '',
      peer_reviewed: false,
      public: true,
      published_on: 1742304553,
      stats: {
        is_voted: false,
        number_of_accessible_forks: 0,
        number_of_bookmarked_comments: 0,
        number_of_bookmarks: 0,
        number_of_collections: 0,
        number_of_comments: 0,
        number_of_equipments: 0,
        number_of_exports: 0,
        number_of_forks: {
          private: 0,
          public: 0,
        },
        number_of_protocol_comments: 0,
        number_of_reagents: 0,
        number_of_runs: 0,
        number_of_steps: 8,
        number_of_steps_comments: 0,
        number_of_views: 759,
        number_of_votes: 0,
      },
      title:
        'Populating metadata templates for NCBI submissions using PulseNet 2.0',
      title_html:
        '<p>Populating metadata templates for NCBI submissions using PulseNet 2.0</p>',
      units: [
        {
          can_manage: 0,
          id: 1,
          name: 'µL',
          read_only: 0,
          type_id: 3,
        },
        {
          can_manage: 0,
          id: 2,
          name: 'mL',
          read_only: 0,
          type_id: 3,
        },
        {
          can_manage: 0,
          id: 3,
          name: 'L',
          read_only: 0,
          type_id: 3,
        },
      ],
      uri: 'long-slug-for-article-a4e7dd2a',
      url: 'https://www.protocols.io/view/long-slug-for-article-a4e7dd2a',
      version_id: 5,
      versions: [
        {
          doi: 'dx.doi.org/10.17504/protocols.io.3byl4qn4ovo5/v1',
          guid: '',
          id: 94941,
          image: {
            placeholder: 'https://content.protocols.io/files/puci9yen.jpg',
            source: 'https://content.protocols.io/files/puci9yen.jpg',
          },
          published_on: 1707936732,
          title:
            'Populating NCBI template for submissions using  BioNumerics  ',
          title_html:
            'Populating NCBI template for submissions using  BioNumerics  ',
          uri: 'populating-ncbi-template-for-submissions-using-bio-c8x5zxq6',
          version_id: 0,
        },
      ],
      warning:
        '{"blocks":[{"key":"61j40","text":"We will be updating this protocol with each new PulseNet 2.0 upgrade that impacts NCBI submissions","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}}],"entityMap":{}}',
    },
  ],
  pagination: {
    changed_on: null,
    current_page: 1,
    first: 0,
    last: 114,
    next_page:
      'https://www.protocols.io/api/v3/protocols?filter=public&key=temp&page_id=2',
    page_size: 10,
    prev_page: null,
    total_pages: 12,
    total_results: 115,
  },
  status_code: 0,
};
