export const projectsQuery = `
  *[_type == "projects"] | order(_createdAt desc) {
    _id,
    title,
    "slug": slug.current,
    description,
    heroMedia {
      _type,
      label,
      type,
      image {
        asset-> {
          _id,
          url
        }
      },
      video {
        asset-> {
          _id,
          filename,
          playbackId,
          status,
          thumbTime
        }
      }
    },
    mediaGallery[] {
      _type,
      label,
      type,
      image {
        asset-> {
          _id,
          url
        }
      },
      video {
        asset-> {
          _id,
          filename,
          playbackId,
          status,
          thumbTime
        }
      }
    }
  }
`

export const siteSettingsQuery = `
  *[_type == "siteSettings"][0] {
    _id,
    name,
    bio,
    awardsAndPress[],
    email,
    instagram,
    selectedWorks[]-> {
      _id,
      title,
      "slug": slug.current,
      description,
      heroMedia {
        _type,
        label,
        type,
        image {
          asset-> {
            _id,
            url
          }
        },
        video {
          asset-> {
            _id,
            filename,
            playbackId,
            status,
            thumbTime
          }
        }
      },  
    },
  }
`

export const projectBySlugQuery = `
  *[_type == "projects" && slug.current == $slug][0] {
    _id,
    title,
    "slug": slug.current,
    description,
    heroMedia {
      type,
      label,
      image {
        asset-> {
          url
        }
      },
      video {
        asset-> {
          playbackId,
          filename
        }
      }
    },
    mediaGallery[] {
      label,
      type,
      image {
        asset-> {
          url
        }
      },
      video {
        asset-> {
          playbackId,
          filename
        }
      }
    }
  }
`