/* eslint max-len: "off", quotes: ["error", "double"] */
const Translations = {
  fr: {
    common: {
      pinned: "Épinglés",
      moreResult: "Afficher plus de résultats",
      emojis: {
        currentUserTooltip: "Vous (cliquez pour supprimer)",
        currentTooltipTitle: "avez réagi avec %{emoji}",
        tooltipTitle: "ont réagi avec %{emoji}",
        tooltipTitle_1: "a réagi avec %{emoji}"
      },
      clickDownload: "Cliquer pour télécharger",
      remove: "Supprimer",
      examinationClick: "%{name} (Cliquer pour voir l'avis des examinateurs)",
      imageSlider: {
        downLoadImage: "Cliquer pour télécharger",
        downLoadImageSize: "Cliquer pour télécharger (%{size})"
      }
    },
    idea: {
      private: "Privée",
      privatePublishAction: "Privée (Cliquer pour publier)",
      favorable: "Favorable",
      unfavorable: "Défavorable",
      toStudy: "À retravailler"
    },
    editor: {
      addEmbed: "Integrer le contenu d'une URL (une video, un article ....)",
      addImage: "Ajouter une image",
      addSeparator: "Ajouter un séparateur",
      addEmbedForm: "Integrer le contenu d'une URL",
      addEmbedFormPlaceholder: "Entrer une url",
      addEmbedFormSubmission: "Integrer",
      heading1: "Titre 1",
      heading2: "Titre 2",
      heading3: "Titre 3",
      blockquote: "Blockquote",
      unorderedL: "Liste non ordonnée",
      orderedL: "Liste ordonnée",
      todoL: "Liste de choses à faire",
      bold: "Gras",
      italic: "Italioque",
      underline: "Souligné",
      highlight: "Accentué",
      addLink: "Ajouter un lien"
    },
    processes: {
      novaideoabstractprocess: {
        select: {
          title: "Suivre",
          description: "Suivre"
        },
        deselect: {
          title: "Retirer de mes suivis",
          description: "Retirer de mes suivis"
        },
        addreaction: {
          title: "Ajouter une réaction",
          description: "Ajouter une réaction"
        }
      },
      ideamanagement: {
        create: {
          title: "",
          description: "",
          submission: "Enregistrer"
        },
        createAndPublish: {
          submission: "Enregistrer et publier"
        },
        edit: {
          title: "Editer",
          description: "Editer la proposition",
          submission: "Enregistrer"
        },
        publish: {
          title: "Publier",
          description: "Publier la proposition",
          confirmation: "Voulez-vous vraiment publier cette proposition ? Cette opération est irréversible.",
          submission: "Oui ! Publier"
        },
        delete: {
          title: "Supprimer",
          description: "Supprimer la proposition",
          confirmation: "Voulez-vous vraiment supprimer cette proposition ? Cette opération est irréversible.",
          submission: "Oui ! Supprimer"
        },
        oppose: {
          title: "S'opposer",
          description: "S'opposer à la proposition"
        },
        support: {
          title: "Soutenir",
          description: "Soutenir la proposition"
        },
        withdrawToken: {
          title: "Retirer",
          description: "Retirer mon jeton"
        },
        comment: {
          title: "Commenter la proposition",
          description: "Commenter la proposition"
        }
      },
      commentmanagement: {
        transformtoidea: {
          title: "Transformer en une proposition",
          description: "Transformer en une proposition"
        },
        delete: {
          title: "Supprimer",
          description: "Supprimer le message",
          confirmation: "Voulez-vous vraiment supprimer ce message de cette conversation ? Cette opération est irréversible.",
          submission: "Oui ! Supprimer"
        },
        pin: {
          title: "Épingler",
          description: "Épingler le message",
          confirmation: "Voulez-vous vraiment épingler ce message à cette conversation ?",
          submission: "Oui ! Épingler"
        },
        unpin: {
          title: "Désépingler",
          description: "Désépingler le message",
          confirmation: "Voulez-vous vraiment désépingler ce message de cette conversation ?",
          submission: "Oui ! Désépingler"
        },
        respond: {
          title: "Répondre",
          description: "Répondre à ce message"
        },
        edit: {
          title: "Éditer",
          description: "Éditer le message",
          submission: "Enregistrer les changements"
        }
      },
      usermanagement: {
        discuss: {
          title: "Discuter",
          description: "Discuter"
        }
      }
    },
    channels: {
      switchChat: "Accéder à mes discussions",
      switchApp: "Accéder à mes contenus",
      jump: "Accéder à...",
      channels: "Discussions",
      thread: "Fil de discussion",
      edited: "modifié",
      noMessage: "Aucun message n'est encore posté sur cette discussion ! Soyez le premier à poster un message.",
      ctComment: "Actuellement, la discussion est bloquée et aucun message ne peut être posté.",
      private: "Discussions privées",
      pinnedBlockTitle: "%{count} messages épinglés",
      pinnedBlockTitle_0: "Aucun message épinglé",
      pinnedBlockTitle_1: "Un message épinglé",
      noPinnedBlock:
        "Il n'y a pas encore de messages épinglés ! Ouvrez le menu contextuel des messages importants et choisissez Épingler pour les conserver ici.",
      infoBlockTitle: "Informations sur la chaîne",
      filesBlockTitle: "Fichiers partagés",
      filesBlockTitle_0: "Aucun fichier partagé",
      noFilesBlock: "Il n'y a pas encore de messages avec des fichiers attachées !",
      membersBlockTitle: "%{count} membres",
      membersBlockTitle_0: "Aucun membre",
      membersBlockTitle_1: "Un membre",
      rightTitleAbout: "À propos de la discussion #%{name}",
      searchBlockTitle: "Résultats de la recherche",
      noResultBlock: "Aucun résultat trouvé pour votre recherche ! Vérifiez l'orthographe ou essayez avec un autre terme.",
      usersCommentsFooter:
        "Vous êtes au tout début de votre discussion. Dans cette discussion vous pouvez discuter en privée avec %{name}, partagez des fichiers ou des liens...",
      ideasCommentsFooter:
        "Vous êtes au tout début de cette discussion. Dans cette discussion vous pouvez partager votre point de vu avec les autres utilisateurs, partagez des fichiers ou des liens...",
      ideasCommentsFooterTitle: "Ceci est l'espace de discussion associée à la proposition %{name}.",
      usersCommentsFooterTitle: "Ceci est votre espace de discussion privée avec %{name}.",
      replyCommentFooter:
        "Vous êtes au tout début de ce fil de discussion. Dans ce fil vous pouvez répondre à l'auteur de ce message, partager votre point de vu avec les autres utilisateurs, partagez des fichiers ou des liens...",
      reply: "Ajouter une réponse à %{name}",
      replies: "%{count} réponses",
      replies_1: "Une réponse",
      unreadReplies: "%{count} non lus",
      unreadReplies_1: "Un non lu",
      navbar: {
        info: "Informations sur la discussion",
        pinned: "Les messages épinglés",
        members: "Les membres abonnés à la discussion",
        files: "Les messages avec des fichiers attachés"
      },
      unreadMessages: "nouveaux messages",
      unreadMessages_1: "nouveau message"
    },
    forms: {
      optional: "(facultatif)",
      disableAnonymity: "Désactiver l'anonymat",
      remainAnonymous: "Activer l'anonymat",
      attachFiles: "Attacher des fichiers",
      searchOrAdd: "Recherche ou ajout",
      search: "Recherche",
      cancel: "Annuler",
      add: "Ajouter",
      record: "Enregistrer un message vocal",
      idea: {
        title: "Titre de la proposition",
        titleHelper: "Titre",
        textPlaceholder: "J'ai une proposition !",
        textPlaceholderOpened: "Le texte de votre proposition ici",
        keywords: "Ajouter des mots clés",
        addProposal: "Ajouter une nouvelle proposition"
      },
      comment: {
        textPlaceholder: "Envoyer un message à #%{name}",
        searchPlaceholder: "Rechercher dans #%{name}"
      }
    },
    evaluation: {
      tokens: "Jetons",
      tokens_1: "Jeton",
      support: "Soutiens",
      support_1: "Soutien",
      opposition: "Oppositions",
      opposition_1: "Opposition"
    },
    date: {
      format: "D MMMM YYYY",
      format2: "DD-MM-YYYY",
      format3: "D MMMM YYYY à h [h] mm [min] ss [s]",
      today: "[Aujourd'hui]",
      yesterday: "[Hier]",
      todayFormat: "[Aujourd'hui] à h [h] mm [min] ss [s]",
      yesterdayFormat: "[Hier à] h [h] mm [min] ss [s]"
    },
    time: {
      format: "h [h] mm"
    },
    user: {
      myContents: "Mes contenus",
      myFollowings: "Mes suivis",
      myEvaluations: "Mes appréciations"
    }
  },
  en: {
    common: {
      pinned: "Pinned",
      moreResult: "See more results",
      emojis: {
        currentUserTooltip: "You (click to remove)",
        currentTooltipTitle: "reacted with %{emoji}",
        tooltipTitle: "reacted with %{emoji}",
        tooltipTitle_1: "reacted with %{emoji}"
      },
      clickDownload: "Click to download",
      remove: "Remove",
      examinationClick: "%{name} (Click to see the reviewers' opinion)",
      imageSlider: {
        downLoadImage: "Click to download",
        downLoadImageSize: "Click to download (%{size})"
      }
    },
    idea: {
      private: "Private",
      privatePublishAction: "Private (Click to publish)",
      favorable: "Positive",
      unfavorable: "Negative",
      toStudy: "To be re-worked upon"
    },
    editor: {
      addEmbed: "Embed the content of an URL (a video, an article ....)",
      addImage: "Add an image",
      addSeparator: "Add a separator",
      addEmbedForm: "Embed the content of an URL",
      addEmbedFormPlaceholder: "Enter an URL",
      addEmbedFormSubmission: "Embed",
      heading1: "Heading 1",
      heading2: "Heading 2",
      heading3: "Heading 3",
      blockquote: "Blockquote",
      unorderedL: "Unordered list",
      orderedL: "Ordered list",
      todoL: "To do list",
      bold: "Bold",
      italic: "Italic",
      underline: "Underline",
      highlight: "Highlight selection",
      addLink: "Add a link"
    },
    processes: {
      novaideoabstractprocess: {
        select: {
          title: "Follow",
          description: "Follow"
        },
        deselect: {
          title: "Unfollow",
          description: "Unfollow"
        },
        addreaction: {
          title: "Ass a reaction",
          description: "Ass a reaction"
        }
      },
      ideamanagement: {
        create: {
          title: "",
          description: "",
          submission: "Save"
        },
        createAndPublish: {
          submission: "Save and publish"
        },
        edit: {
          title: "Edit",
          description: "Edit the proposal",
          submission: "Save"
        },
        publish: {
          title: "Publish",
          description: "Publish the proposal",
          confirmation: "Are you sure you want to publish this proposal? This cannot be undone.",
          submission: "Yes ! Publish"
        },
        delete: {
          title: "Remove",
          description: "Remove the proposal",
          confirmation: "Are you sure you want to delete this proposal? This cannot be undone.",
          submission: "Yes ! Remove"
        },
        oppose: {
          title: "Oppose",
          description: "Oppose the proposal"
        },
        support: {
          title: "Support",
          description: "Support the proposal"
        },
        withdrawToken: {
          title: "Withdraw",
          description: "Withdraw my token"
        },
        comment: {
          title: "Comment the proposal",
          description: "Comment the proposal"
        }
      },
      commentmanagement: {
        transformtoidea: {
          title: "Transform to a proposal",
          description: "Transform to a proposal"
        },
        delete: {
          title: "Remove",
          description: "Remove the message",
          confirmation: "Are you sure you want to delete this message from this conversation? This cannot be undone.",
          submission: "Yes ! Remove"
        },
        pin: {
          title: "Pin",
          description: "Pin the message",
          confirmation: "Are you sure you want to pin this message to this conversation?",
          submission: "Yes ! Pin"
        },
        unpin: {
          title: "Unpin",
          description: "Unpin the message",
          confirmation: "Are you sure you want to unpin this message from this conversation?",
          submission: "Yes ! Unpin"
        },
        respond: {
          title: "Respond",
          description: "Respond to this message"
        },
        edit: {
          title: "Edit",
          description: "Edit this message",
          submission: "Save Changes"
        }
      },
      usermanagement: {
        discuss: {
          title: "Discuss",
          description: "Discuss"
        }
      }
    },

    channels: {
      switchChat: "Access my discussions",
      switchApp: "Access my contents",
      jump: "Jump to...",
      channels: "Discussions",
      thread: "Thread",
      edited: "edited",
      noMessage: "There are no messages on this discussion yet! Be the first to post a message.",
      ctComment: "Currently, the discussion is blocked and no message can be posted.",
      private: "Private discussions",
      pinnedBlockTitle: "%{count} pinned messages",
      pinnedBlockTitle_0: "No pinned messages",
      pinnedBlockTitle_1: "One pinned message",
      noPinnedBlock:
        "No messages have been pinned yet! Open the context menu on important messages and choose Pin to stick them here.",
      infoBlockTitle: "Channel information",
      filesBlockTitle: "Shared files",
      filesBlockTitle_0: "No shared files",
      noFilesBlock: "There are no messages with attached files yet!",
      membersBlockTitle: "%{count} members",
      membersBlockTitle_0: "No members",
      membersBlockTitle_1: "One member",
      rightTitleAbout: "About the discussion #%{name}",
      searchBlockTitle: "Search results",
      noResultBlock: "No results found for your search ! Check your spelling or try another term",
      usersCommentsFooter:
        "You are at the beginning of your discussion, in this discussion you can discuss privately with %{name}, share files or links ...",
      ideasCommentsFooter:
        "You are at the beginning of this discussion.In this discussion you can share your point of view with other users, share files or links ...",
      ideasCommentsFooterTitle: "This is the discussion space associated with the proposal %{name}.",
      usersCommentsFooterTitle: "This is your private discussion with %{name}.",
      replyCommentFooter:
        "You are at the beginning of this thread. In this thread you can respond to the author of this message, share your point of view with other users, share files or links ...",
      reply: "Add reply to %{name}",
      replies: "%{count} replies",
      replies_1: "One reply",
      unreadReplies: "%{count} unread",
      unreadReplies_1: "One unread",
      navbar: {
        info: "Channel information",
        pinned: "Pinned messages",
        members: "Members",
        files: "Files"
      },
      unreadMessages: "new messages",
      unreadMessages_1: "new message"
    },
    forms: {
      optional: "(optional)",
      disableAnonymity: "Disable anonymity",
      remainAnonymous: "Remain anonymous",
      attachFiles: "Attach files",
      searchOrAdd: "Search or add",
      search: "Search",
      cancel: "Cancel",
      add: "Add",
      record: "Record a voice message",
      idea: {
        title: "The title of the proposal",
        titleHelper: "Title",
        textPlaceholder: "I have an proposal!",
        textPlaceholderOpened: "The text of your proposal here",
        keywords: "Add keywords",
        addProposal: "Add a new proposal"
      },
      comment: {
        textPlaceholder: "Submit a message to #%{name}",
        searchPlaceholder: "Search in #%{name}"
      }
    },
    evaluation: {
      tokens: "Tokens",
      tokens_1: "Token",
      support: "Supports",
      support_1: "Support",
      opposition: "Oppositions",
      opposition_1: "Opposition"
    },
    date: {
      format: "MMMM Do, YYYY",
      format2: "YYYY-MM-DD",
      format3: "MMMM Do, YYYY at h [h] mm [min] ss [s]",
      today: "[Today]",
      yesterday: "[Yesterday]",
      todayFormat: "[Today at] h [h] mm [min] ss [s]",
      yesterdayFormat: "[Yesterday at] h [h] mm [min] ss [s]"
    },
    time: {
      format: "h \\h mm"
    },
    user: {
      myContents: "My contents",
      myFollowings: "My followings",
      myEvaluations: "My evaluations"
    }
  }
};

module.exports = Translations; // keep commonJS syntax for the node i18n:export script to work