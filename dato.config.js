module.exports = (dato, root, i18n) => {
  root.createDataFile('source/_data/settings.yml', 'yaml', {
    name: dato.site.globalSeo.siteName,
    language: dato.site.locales[0],
    intro: dato.home.introText,
    copyright: dato.home.copyright,
    socialProfiles: dato.socialProfiles.map(profile => {
      return {
        type: profile.profileType.toLowerCase().replace(/ +/, '-'),
        url: profile.url,
      };
    }),
    faviconMetaTags: dato.site.faviconMetaTags,
    seoMetaTags: dato.home.seoMetaTags
  });

  root.createPost(`source/about/index.md`, 'yaml', {
    frontmatter: {
      title: dato.aboutPage.title,
      subtitle: dato.aboutPage.subtitle,
      photo: dato.aboutPage.photo.url({ w: 800, fm: 'jpg', auto: 'compress' }),
      layout: 'page',
      seoMetaTags: dato.aboutPage.seoMetaTags,
    },
    content: dato.aboutPage.bio
  });

  root.directory('source/_posts', dir => {
    dato.works.forEach((work, index) => {
      dir.createPost(`${work.slug}.md`, 'yaml', {
        frontmatter: {
          title: work.title,
          layout: 'post',
          coverImage: work.coverImage.url({ w: 450, fm: 'jpg', auto: 'compress' }),
          detailImage: work.coverImage.url({ w: 600, fm: 'jpg', auto: 'compress' }),
          position: index,
          contentExcerpt: work.excerpt,
          seoMetaTags: work.seoMetaTags,
          extraImages: work.gallery.map(image =>
            image.url({ h: 300, fm: 'jpg', auto: 'compress' })
          ),
        },
        content: work.description
      });
    });
  });
};

