# Style System Documentation

## _card.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.art-card` | Article Card that supports data in corner | Articles.tsx |
| `.art-card .date` | Article Date Format on bottom left | Articles.tsx |
| `.bento` | Standard Bento box section layout. | LeadershipSection.tsx, ShowcaseDetail.tsx |
| `.bento-showcase-section` | A specialized surface for Benta Showcase items | ShowcaseDetail.tsx |
| `.c-career-card-heading` | *No description provided.* | CompanyCard.tsx |
| `.c-career-card-heading .c-career-company` | *No description provided.* | CompanyCard.tsx |
| `.c-career-page-heading` | *No description provided.* | Era.tsx |
| `.card` | Standard card for general content | Archive.tsx, CareerSection.tsx, CaseStudies.tsx, LeadershipSection.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, showcase.tsx |
| `.comp-card` | Company Card that has second row of content | CompanyCard.tsx |

## _cards.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-art-row` | horizontal layout container specifically for article lists. | ArticlesSection.tsx |
| `.c-blueprint-sidebar` | apply a technical/blueprint aesthetic to the showcase sidebar. | ShowcaseDetail.tsx |
| `.c-breadcrumb` | render breadcrumb navigation paths. | Breadcrumb.tsx, showcase1.tsx |
| `.c-breadcrumb .sep` | Breadcrumb Seperator | Breadcrumb.tsx, showcase1.tsx |
| `.c-hud-status` | render a heads-up display status indicator in the sidebar. | Sidebar.tsx |
| `.c-link-interactive` | apply standard interactive link behavior with animations. | Archive.tsx, CaseStudies.tsx, CompanyCard.tsx, LeadershipSection.tsx, OpenSourceProjects.tsx, showcase.tsx |
| `.c-meta-strip` | align multiple `.c-meta-item` elements horizontally. | EraDetail.tsx |
| `.c-meta-strip .c-meta-item` | format individual pieces of metadata. | EraDetail.tsx |
| `.tooltip-trigger` | attach hover interactions for glossary tooltips. | None |

## _elements.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.action-link` | for project actions, this formats the links | LabDetail.tsx |
| `.action-link .action-prefix` | be an icon or text prefix for action links. | LabDetail.tsx |
| `.gold-spacer` | gold space for separating sections | None |
| `.project-actions` | Under the open source title, we need to display websites, tags and the like | LabDetail.tsx |
| `.project-meta-top` | Shows Role and stack in grey box with gold boarder | ShowcaseDetail.tsx |
| `.project-meta-top .meta-item` | format individual pieces of metadata. | None |

## _expansion.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.caret-indicator` | format a collapsible caret icon. | LeadershipSection.tsx |
| `.caret-indicator.rotated` | Rotate the caret | LeadershipSection.tsx |
| `.clr-muted` | apply a muted color block. | Archive.tsx, OpenSourceProjects.tsx |
| `.expansion-viewport-inner` | wrap the animating content of an expandable drawer. | LeadershipSection.tsx |
| `.flex-split-top` | create a flex layout split with top alignment. | OpenSourceProjects.tsx |
| `.fs-09` | explicitly set the font size to 0.9 units. | OpenSourceProjects.tsx |
| `.lab-detail-desc` | format the header and description of lab detail pages. | LabDetail.tsx |
| `.lab-header` | format the header and description of lab detail pages. | LabDetail.tsx |
| `.modal-cell-fill` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-clip-x` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-no-shrink` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-pane-frame-max` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-row-split-gap` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-scroll-y` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.modal-txt-wrap` | internal utility classes to handle flexbox behaviors, wrapping, and scrolling within specific modal nodes. | LinkModal.tsx |
| `.mt-15px` | apply exact pixel-based margin-top values. | None |
| `.mt-5px` | apply exact pixel-based margin-top values. | None |
| `.mt-60px` | apply exact pixel-based margin-top values. | LabDetail.tsx |
| `.mt-8px` | apply exact pixel-based margin-top values. | OpenSourceProjects.tsx |
| `.no-decor` | strip standard element decorations. | Archive.tsx, Articles.tsx, CompanyCard.tsx |
| `.pd-2rm` | apply a 2rem padding utility. | LinkModal.tsx |
| `.row-align-top` | force flex rows to align top and justify space-between. | OpenSourceProjects.tsx |
| `.row-justify-sb` | force flex rows to align top and justify space-between. | OpenSourceProjects.tsx |

## _forms.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-btn` | the standard interactive button component. | ContactSection.tsx, EraDetail.tsx, LabDetail.tsx, ShowcaseDetail.tsx, case-study.tsx |
| `.c-contact` | *No description provided.* | ContactSection.tsx |
| `.c-contact-actions` | *No description provided.* | ContactSection.tsx |
| `.c-contact-copy` | *No description provided.* | ContactSection.tsx |
| `.c-contact-copy-feedback` | *No description provided.* | ContactSection.tsx |
| `.c-contact-direct` | *No description provided.* | None |
| `.c-contact-email-button` | *No description provided.* | ContactSection.tsx |
| `.c-contact-form` | the main wrapper for the contact form. | ContactSection.tsx |
| `.c-contact-form .c-btn` | *No description provided.* | ContactSection.tsx |
| `.c-contact-form .c-contact-error` | *No description provided.* | ContactSection.tsx |
| `.c-contact-form .c-contact-success` | *No description provided.* | ContactSection.tsx |
| `.c-contact-header` | *No description provided.* | ContactSection.tsx |
| `.c-contact-header .home-section-title` | *No description provided.* | ContactSection.tsx |
| `.c-contact-panel` | *No description provided.* | ContactSection.tsx |
| `.c-contact-socials` | *No description provided.* | ContactSection.tsx |

## _modals.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-close-btn` | a generic close button for UI overlays. | UptimeModal.tsx |
| `.c-kbd-hint` | style keyboard shortcut hints (like "Esc"). | LinkModal.tsx |
| `.c-modal-body` | structure the internal layout architecture of generic modals. | LinkModal.tsx |
| `.c-modal-close` | style the close icon/button for generic modals. | LinkModal.tsx |
| `.c-modal-container` | structure the internal layout architecture of generic modals. | LinkModal.tsx |
| `.c-modal-error` | dictate the loading or error states within a modal. | LinkModal.tsx |
| `.c-modal-footer` | structure the internal layout architecture of generic modals. | LinkModal.tsx |
| `.c-modal-frame-line` | render a stylized border or frame around the modal. | LinkModal.tsx |
| `.c-modal-header` | structure the internal layout architecture of generic modals. | LinkModal.tsx |
| `.c-modal-loading` | dictate the loading or error states within a modal. | LinkModal.tsx |
| `.c-modal-scrollzone` | manage the scrollable area inside a modal. | LinkModal.tsx |
| `.c-modal-title-link` | style interactive links within the modal title. | LinkModal.tsx |
| `.c-tag-separator` | a visual divider placed between inline tags. | LinkModal.tsx, UptimeModal.tsx |
| `.c-telemetry-content` | structure the specific layout of the Uptime/Telemetry overlay. | UptimeModal.tsx |
| `.c-telemetry-footer` | structure the specific layout of the Uptime/Telemetry overlay. | UptimeModal.tsx |
| `.c-telemetry-header` | structure the specific layout of the Uptime/Telemetry overlay. | UptimeModal.tsx |
| `.c-telemetry-modal` | structure the specific layout of the Uptime/Telemetry overlay. | UptimeModal.tsx |
| `.c-telemetry-sheet` | render the tabular data sheet within the telemetry modal. | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-body` | temelemetry Sheet body format | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header` | implement Sheet header | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .col-lbl` | Cell Label | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .col-node` | Cell vaue | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .metrics-lbl-group` | metrics label | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .metrics-lbl-group .col-latency` | metrics label latency style | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .metrics-lbl-group .col-lbl` | metrics label value | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-header .metrics-lbl-group .col-pulse` | metrics pulse icon style | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row` | temelemetry sheet row | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-beacon` | Row beacon icon | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-beacon.offline` | format if offline | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-beacon.online` | format if if Online | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content` | row content | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics` | service metrics | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .col-pulse-container` | metrics pulse | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .latency-val` | metrics latency | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .latency-val .unit` | latency unit | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .metric-val` | metrics value | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .pulse-vector` | pulse vector | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .pulse-vector.active` | pulse icon | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-metrics .pulse-vector.failed` | pulse icon | UptimeModal.tsx |
| `.c-telemetry-sheet .sheet-row .row-content .node-name` | service name | UptimeModal.tsx |
| `.c-telemetry-status` | format the overall network status indicator. | UptimeModal.tsx |
| `.c-telemetry-status.error` | status icon if error | UptimeModal.tsx |
| `.l-footer-right` | align footer content to the right side of the screen. | UptimeModal.tsx |
| `.l-modal-overlay` | create the fixed, full-screen background overlay behind modals. | LinkModal.tsx |
| `.l-telemetry-overlay` | create the fixed, full-screen background overlay behind modals. | UptimeModal.tsx |
| `.modal-image-view` | manage the layout, content area, and close interaction for full-screen image views. | ImageModal.tsx |
| `.modal-image-view .modal-close-btn` | manage the layout, content area, and close interaction for full-screen image views. | ImageModal.tsx |
| `.modal-image-view .modal-content` | manage the layout, content area, and close interaction for full-screen image views. | ImageModal.tsx |

## _scrollbar.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.sidebar` | manage the specific styling, layout, and list structure of the global sidebar. | NavBarLinks.tsx, Sidebar.tsx, SidebarLinks.tsx |
| `.sidebar-avatar` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-focus` | *No description provided.* | Sidebar.tsx |
| `.sidebar-logo` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-subtitle` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-title` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-ul` | manage the specific styling, layout, and list structure of the global sidebar. | SidebarLinks.tsx |

## _tags.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.tag` | shared tag control style. | Articles.tsx, ArticlesSection.tsx, Home.tsx, Tags.tsx, UptimeModal.tsx |
| `.tag-wrapper` | a container for tags | LabDetail.tsx, Tags.tsx |
| `.tag.c-topic-tag` | *No description provided.* | ArticlesSection.tsx, Home.tsx, Tags.tsx |
| `.tag.c-topic-tag.c-topic-tag--concept` | *No description provided.* | Home.tsx, Tags.tsx |

## _case.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.case-study-view` | a specialzied surface for Case Studies and Showcases (full techincal writeups) | case-study.tsx |
| `.case-study-view .study-header` | lay out the headers for case studies and showcases. | case-study.tsx |
| `.case-study-view .tech-specs` | format technical specifications, constraints, and their containing body block. | case-study.tsx |
| `.case-study-view .tech-specs .spec` | format technical specifications, constraints, and their containing body block. | case-study.tsx |
| `.case-study-view .technical-body` | format technical specifications, constraints, and their containing body block. | case-study.tsx |

## _typography.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-prose-container` | constrain and format long-form markdown/text content. | LabDetail.tsx |
| `.f-breadcrumb-active` | style the text of the currently active breadcrumb. | Breadcrumb.tsx |
| `.f-clr-accent` | apply the primary accent color to text. | EraDetail.tsx |
| `.f-clr-main` | apply the primary text color. | CaseStudies.tsx, showcase.tsx |
| `.f-clr-muted` | apply a muted or secondary color to text. | showcase.tsx |
| `.f-font-mono` | force a monospaced font family for technical data or labels. | LinkModal.tsx, UptimeModal.tsx |
| `.f-gold-bullet` | render list items with a custom gold bullet point. | LeadershipSection.tsx, ShowcaseDetail.tsx |
| `.f-hd-md` | apply medium and extra-small font sizes for headings. | CaseStudies.tsx, showcase.tsx |
| `.f-hd-xs` | apply medium and extra-small font sizes for headings. | None |
| `.f-label-mono` | force a monospaced font family for technical data or labels. | EraDetail.tsx, LeadershipSection.tsx |
| `.f-md-meta` | apply font sizing specifically optimized for metadata. | LinkModal.tsx, UptimeModal.tsx |
| `.f-meta-xs` | apply font sizing specifically optimized for metadata. | Archive.tsx, CaseStudies.tsx, OpenSourceProjects.tsx, showcase.tsx |
| `.f-mono-muted` | force a monospaced font family for technical data or labels. | None |
| `.f-mt-1` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-mt-2` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-mt-4` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-no-decor` | strip standard browser text decoration (like underlines). | CareerSection.tsx, LinkModal.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.f-text-gold` | apply the gold accent color strictly to text nodes. | UptimeModal.tsx |
| `.f-text-gold-value` | apply the gold accent color strictly to text nodes. | UptimeModal.tsx |

## _grid.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.l-archive` | dictate the overall layout for the archive view. | Archive.tsx, CaseStudies.tsx |
| `.l-archive .archive-header` | format the top header of the archive page. | Archive.tsx |
| `.l-art-grid` | apply a CSS grid specifically optimized for article cards. | Articles.tsx |
| `.l-default-margin` | enforce a standard margin constraint across the page. | Archive.tsx |
| `.l-description-container` | constrain description blocks within detail views. | EraDetail.tsx |
| `.l-desktop-viewport` | limit or optimize layout specifically for desktop screens. | LeadershipSection.tsx |
| `.l-detail-view` | the primary layout wrapper for detail pages. | EraDetail.tsx |
| `.l-era` | handle the specific layout requirements for Era timeline views. | None |
| `.l-era-container` | handle the specific layout requirements for Era timeline views. | EraDetail.tsx |
| `.l-era-header` | handle the specific layout requirements for Era timeline views. | EraDetail.tsx, showcase1.tsx |
| `.l-era-header .brand-box` | style company logos and branding containers in detail views. | EraDetail.tsx |
| `.l-era-header .brand-box .company-logo-large` | handle company logo | EraDetail.tsx |
| `.l-era-header .brand-box .external-link` | style links that leave the site. | EraDetail.tsx |
| `.l-expansion-viewport` | handle the layout for expandable drawer components. | LeadershipSection.tsx |
| `.l-expansion-viewport.is-open` | trigger the expanded state and associated animations. | LeadershipSection.tsx |
| `.l-grid-2` | generate 2-column and 3-column CSS grid layouts. | Archive.tsx, Articles.tsx, LeadershipSection.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseDetail.tsx |
| `.l-grid-3` | generate 2-column and 3-column CSS grid layouts. | LeadershipSection.tsx |
| `.l-grid-3 .l-grid-3.leadership-controls` | handle the specific layout requirements for the leadership view. | LeadershipSection.tsx |
| `.l-hero-intro` | structure the primary introduction/hero section. | Sidebar.tsx |
| `.l-leadership-node` | handle layout for specific leadership tree or chart nodes. | LeadershipSection.tsx |
| `.l-leadership-section` | handle layout for specific leadership tree or chart nodes. | LeadershipSection.tsx |
| `.l-scroll-y` | apply vertical scrolling to a container, mapping to `overflow-y-auto`. | SidebarLinks.tsx, app.tsx |
| `.l-showcase-grid` | dictate the grid layout for technical showcases. | ArticlesSection.tsx, CareerSection.tsx, CaseStudies.tsx, ContactSection.tsx, Era.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx, showcase.tsx |
| `.l-showcase-layout` | dictate the grid layout for technical showcases. | ShowcaseDetail.tsx |

## _shell.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.l-shell` | the foundational application shell containing the sidebar and main content. | app.tsx |

## main.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-art-row + .c-art-row .home-article-entry` | *No description provided.* | ArticlesSection.tsx |
| `.c-more-link` | *No description provided.* | MoreFooter.tsx |
| `.c-more-link .l-scroll-y.l-scroll-home` | *No description provided.* | None |
| `.home-article-copy` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-copy .c-art-row` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-entry` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-list` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-meta` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-tags` | *No description provided.* | ArticlesSection.tsx |
| `.home-article-tags .tag` | *No description provided.* | ArticlesSection.tsx |
| `.home-card-grid` | *No description provided.* | CareerSection.tsx, OpenSourceSection.tsx |
| `.home-card-grid .c-art-row .card` | *No description provided.* | None |
| `.home-card-grid .card` | *No description provided.* | CareerSection.tsx, OpenSourceSection.tsx |
| `.home-card-grid .card .home-card-meta` | *No description provided.* | CareerSection.tsx, OpenSourceSection.tsx |
| `.home-card-grid .card .tag-wrapper` | *No description provided.* | None |
| `.home-career-card-heading` | *No description provided.* | CareerSection.tsx |
| `.home-career-card-heading .home-career-company` | *No description provided.* | CareerSection.tsx |
| `.home-career-grid` | *No description provided.* | CareerSection.tsx |
| `.home-career-grid .card` | *No description provided.* | CareerSection.tsx |
| `.home-content > .l-showcase-grid` | *No description provided.* | None |
| `.home-open-source-grid` | *No description provided.* | OpenSourceSection.tsx |
| `.home-open-source-grid .card` | *No description provided.* | OpenSourceSection.tsx |
| `.home-preview-label` | *No description provided.* | ArticlesSection.tsx |
| `.home-preview-label .home-article-entry` | *No description provided.* | ArticlesSection.tsx |
| `.home-preview-label .home-article-meta` | *No description provided.* | ArticlesSection.tsx |
| `.home-section-heading` | *No description provided.* | ArticlesSection.tsx, CareerSection.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.home-section-heading .home-section-title` | *No description provided.* | ArticlesSection.tsx, CareerSection.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.home-section-title` | *No description provided.* | ArticlesSection.tsx, CareerSection.tsx, ContactSection.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.home-showcase-card` | *No description provided.* | ShowcaseSection.tsx |
| `.home-showcase-card .tag-wrapper` | *No description provided.* | None |
| `.home-showcase-list` | *No description provided.* | ShowcaseSection.tsx |
| `.home-showcase-outcome` | *No description provided.* | ShowcaseSection.tsx |
| `.home-tag-key` | *No description provided.* | Home.tsx |
| `.home-tag-key .tag` | *No description provided.* | Home.tsx |
| `.home-tag-key-label` | *No description provided.* | Home.tsx |
| `.site-colophon` | *No description provided.* | Home.tsx |
| `.site-colophon .c-archive-link` | *No description provided.* | Home.tsx |
| `.site-colophon .prose-engine p` | *No description provided.* | Home.tsx |

## _navigation.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-hamburger` | render the mobile hamburger menu icon. | NavBar.tsx |
| `.c-nav-brand` | the primary logo or brand text in the navigation bar. | NavBar.tsx |
| `.l-mobile-drawer` | apply mobile-specific navigation layouts. | LeadershipSection.tsx |
| `.l-mobile-drawer.is-open` | special formate when drawer is open | LeadershipSection.tsx |
| `.l-mobile-topbar` | apply mobile-specific navigation layouts. | NavBar.tsx |
| `.l-nav-container` | structure the top navigation and its link elements. | NavBar.tsx |
| `.l-nav-links` | structure the top navigation and its link elements. | NavBarLinks.tsx, SidebarLinks.tsx |
| `.l-nav-links.show` | *No description provided.* | NavBarLinks.tsx |
| `.l-nav-links.show .line` | *No description provided.* | None |
| `.l-nav-links.show a` | *No description provided.* | NavBarLinks.tsx |
| `.l-nav-links.show.active` | *No description provided.* | None |
| `.l-nav-links.show.active .line` | *No description provided.* | None |
| `.l-social-links` | lay out social media icons/links horizontally. | Sidebar.tsx |

