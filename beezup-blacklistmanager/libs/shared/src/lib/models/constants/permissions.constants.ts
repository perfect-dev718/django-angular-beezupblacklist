export const ACTIONS = {
  configurationCenter: {
    commonActions: {
      create: [
        {
          label: 'Data Source',
          value: {
            action: 'createDataSource',
            entityType: 'DataSource'
          }
        },
        {
          label: 'Data Frame',
          value: {
            action: 'createDataFrame',
            entityType: 'DataFrame'
          }
        },
        {
          label: 'Analysis',
          value: {
            action: 'createAnalysis',
            entityType: 'Analysis'
          }
        },
        {
          label: 'Publisher',
          value: {
            action: 'createPublisher',
            entityType: 'Publisher'
          }
        },
        {
          label: 'Analysis Chain',
          value: {
            action: 'createChain',
            entityType: 'Chain'
          }
        },
        {
          label: 'Profile Vector',
          value: {
            action: 'createProfile',
            entityType: 'Profile'
          }
        }
      ],
      metadata: [
        {
          label: 'Export',
          value: {
            action: 'exportMetadata'
          }
        },
        {
          label: 'Import',
          value: {
            action: 'importMetadata',
          }
        },
      ]
    },
    profilePanel: {
      general: [
        {
          label: 'View Schema',
          action: 'viewMetaData',
          icon: 'show-eye-icon'
        },
        {
          label: 'Edit',
          action: 'edit',
          icon: 'edit-icon',
        }
      ],
      generalMore: [
        {
          label: 'Duplicate',
          action: 'duplicate',
        },
        {
          label: 'Delete',
          action: 'delete',
        }
      ],
      dataDetails: [
        {
          label: 'Build Profile',
          action: 'buildProfile',
          icon: 'build-data-icon'
        }
      ],
      dataDetailsMore: [
        {
          label: 'Reset Data',
          action: 'resetData',
        }
      ]
    },
    dataSourcePanel: {
      general: [
        {
          label: 'View Schema',
          action: 'viewMetaData',
          icon: 'show-eye-icon'
        },
        {
          label: 'Explore',
          action: 'viewData',
          icon: 'explore-icon'
        },
        {
          label: 'Edit',
          action: 'edit',
          icon: 'edit-icon',
        },

      ],
      generalMore: [
        {
          label: 'Duplicate',
          action: 'duplicate',
        },
        {
          label: 'Delete',
          action: 'delete',
        }
      ],
      dataDetails: [
        {
          label: 'Import',
          action: 'copyFiles',
          icon: 'import-icon',
        },
        {
          label: 'Upload',
          action: 'uploadDataFull',
          icon: 'upload-files-icon',
        }
      ],
      dataDetailsMore: [
        {
          label: 'Download Sample Preview',
          action: 'downloadSample',
        },
        {
          label: 'Reset Data',
          action: 'resetData',
        },
        {
          label: 'Delete Input Files',
          action: 'deleteInputFiles'
        }
      ]
    },
    dataFramePanel: {
      general: [
        {
          label: 'View Schema',
          action: 'viewMetaData',
          icon: 'show-eye-icon'
        },
        {
          label: 'Explore',
          action: 'viewData',
          icon: 'explore-icon'
        },
        {
          label: 'Edit',
          action: 'edit',
          icon: 'edit-icon'
        }
      ],
      generalMore: [
        {
          label: 'Duplicate',
          action: 'duplicate'
        },
        {
          label: 'Delete',
          action: 'delete'
        }
      ],
      dataDetails: [
        {
          label: 'Build Data',
          action: 'buildData',
          icon: 'build-data-icon'
        }
      ],
      dataDetailsMore: [
        {
          label: 'Reset Data',
          action: 'resetData',
        }
      ]
    },
    analysisPanel: {
      general: [
        {
          label: 'View Results',
          action: 'viewResults',
          icon: 'show-eye-icon'
        },
        {
          label: 'Edit',
          action: 'edit',
          icon: 'edit-icon'
        }
      ],
      generalMore: [
        {
          label: 'Duplicate',
          action: 'duplicate'
        },
        {
          label: 'Delete',
          action: 'delete'
        }
      ],
      dataDetails: [
        {
          label: 'actions.train',
          icon: 'train',
          action: 'trainAnalysis'
        },
        {
          label: 'actions.detect',
          icon: 'detect',
          action: 'runAnalysis'
        },
        {
          label: 'actions.cluster',
          icon: 'cluster',
          action: 'clusterAnomalies'
        },
        {
          label: 'actions.classify',
          icon: 'classify',
          action: 'classifyAnomalies'
        }
      ],
      dataDetailsMore: [
      ]
    },
    publisherPanel: {
      general: [
        {
          label: 'actions.view_ic',
          action: 'viewIC',
          icon: 'show-eye-icon'
        },
        {
          label: 'actions.open_view_ic_settings',
          action: 'viewICSettings',
          icon: 'ic-settings-icon'
        },
        {
          label: 'actions.edit',
          action: 'edit',
          icon: 'edit-icon'
        }
      ],
      generalMore: [
        {
          label: 'Delete',
          action: 'delete'
        }
      ],
      dataDetails: [
        {
          label: 'actions.publish',
          action: 'publish',
          icon: 'alert-publish-icon'
        }
      ],
      dataDetailsMore: [
        {
          label: 'actions.edit_rules',
          action: 'editRules',
        },
        {
          label: 'actions.add_rules',
          action: 'addRules',
        },
        {
          label: 'Generate Report',
          action: 'generateReport'
        },
        {
          label: 'Delete Conditions',
          action: 'deleteRules'
        }
      ]
    },
    chainPanel: {
      general: [
        {
          label: 'Show Steps Graph',
          action: 'showGraph',
          icon: 'show-eye-icon'
        },
        {
          label: 'Edit Chain',
          action: 'editChain',
          icon: 'edit-icon'
        }
      ],
      generalMore: [
        {
          label: 'Delete Chain',
          action: 'deleteChain',
        },
        {
          label: 'View in Monitoring Center',
          action: 'viewOnMonitoringCenter',
        }
      ],
    },
    metadataView: {
      general: [
        {
          label: 'save_changes',
          action: 'save_changes'
        }
      ],
      moreActions: [
        {
          label: 'data_format.filter_bar.add_prefix',
          group: 'rename',
          value: {
            action: 'add_prefix',
          }
        },
        {
          label: 'data_format.filter_bar.add_suffix',
          group: 'rename',
          value: {
            action: 'add_suffix',
          }
        },
        // {
        //   label: 'data_format.filter_bar.show',
        //   group: 'show',
        //   value: {
        //     action: 'show'
        //   }
        // },
        // {
        //   label: 'data_format.filter_bar.show_all_but_selected',
        // group: 'show',
        //   value: {
        //     action: 'show_all_but_selected'
        //   }
        // },
        {
          label: 'data_format.filter_bar.date_format',
          group: 'date_format',
          disabled: true,
          value: {
            action: 'date_format',
          }
        },
        {
          label: 'data_format.filter_bar.recalculate',
          group: 'recalculate',
          value: {
            action: 'recalculate',
          }
        },
        {
          label: 'data_format.filter_bar.reset_sort',
          group: 'recalculate',
          value: {
            action: 'reset_sort',
          }
        },
        // {
        //   label: 'data_format.filter_bar.reset_selected',
        //   group: 'recalculate',
        //   value: {
        //     action: 'reset_selected',
        //   }
        // },
        {
          label: 'data_format.filter_bar.suggest_a_schema',
          group: 'add_schema',
          value: {
            action: 'suggest_a_schema',
          }
        },
        {
          label: 'data_format.filter_bar.import_meta_data',
          group: 'import_meta_data',
          value: {
            action: 'import_meta_data'
          }
        },
        {
          label: 'data_format.filter_bar.download_python',
          group: 'download_python',
          value: {
            action: 'download_python',
          }
        },
        {
          label: 'data_format.filter_bar.download_parameters',
          group: 'download_parameters',
          value: {
            action: 'download_parameters',
          }
        },
        {
          label: 'data_format.filter_bar.download_sparksql',
          group: 'download_sparksql',
          value: {
            action: 'download_sparksql',
          }
        }
      ]
    },
    dataView: {
      moreActions: [
        {
          label: 'data_format.data_actions.range',
          value: {
            action: 'range',
          }
        },
        {
          label: 'data_format.data_actions.all',
          value: {
            action: 'all',
          }
        }
      ]
    }
  },
  monitoringCenter: {
    general: {
      chainDetails: [
        {action: 'viewInConfigurationCenter'}
      ]
    }
  },
  detectionCenter: {
    analysisResults: {
      generalMore: [
        {
          action: 'exportAnalysisResults',
          label: 'exportAnalysisResults'
        }
      ]
    },
    clusterDetails: {
      generalMore: [
        {action: 'type', label: 'type'},
        {action: 'owner', label: 'owner'},
        {action: 'severity', label: 'severity'},
        {action: 'status', label: 'status'},
        {action: 'category', label: 'category'},
        {action: 'description', label: 'description'}],
    },
    anomalyInvestigation: {
      generalMore: [
        {
          action: 'showContextualRows',
          label: 'actions.show_contextual_rows',
          icon: 'show-eye-icon'
        },
        // {
        //   action: 'exportData',
        //   label: 'actions.export',
        //   icon: 'export-data-icon'
        // },
        // {
        //   action: 'togglePanel',
        //   label: '',
        //   icon: 'settings-icon'
        // }
      ]
    }
  }
};
