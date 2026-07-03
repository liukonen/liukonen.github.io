# Style System Documentation

## _card.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.art-card` | Article Card that supports data in corner | Articles.tsx |
| `.art-card .date` | Article Date Format on bottom left | Articles.tsx |
| `.bento` | Standard Bento box section layout. | LeadershipSection.tsx, ShowcaseDetail.tsx |
| `.bento-showcase-section` | A specialized surface for Benta Showcase items | ShowcaseDetail.tsx |
| `.card` | Standard card for general content | Archive.tsx, ArticlesSection.tsx, CareerSection.tsx, CaseStudies.tsx, LeadershipSection.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx, showcase.tsx |
| `.comp-card` | Company Card that has second row of content | CompanyCard.tsx |

## _cards.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-art-row` | horizontal layout container specifically for article lists. | ArticlesSection.tsx |
| `.c-blueprint-sidebar` | apply a technical/blueprint aesthetic to the showcase sidebar. | ShowcaseDetail.tsx |
| `.c-breadcrumb` | render breadcrumb navigation paths. | Breadcrumb.tsx, showcase1.tsx |
| `.c-breadcrumb .sep` | Breadcrumb Seperator | Breadcrumb.tsx, showcase1.tsx |
| `.c-hud-status` | render a heads-up display status indicator in the sidebar. | Sidebar.tsx |
| `.c-link-interactive` | apply standard interactive link behavior with animations. | Archive.tsx, ArticlesSection.tsx, CareerSection.tsx, CaseStudies.tsx, CompanyCard.tsx, LeadershipSection.tsx, MoreFooter.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx, showcase.tsx |
| `.c-meta-strip` | align multiple `.c-meta-item` elements horizontally. | EraDetail.tsx |
| `.c-meta-strip .c-meta-item` | format individual pieces of metadata. | EraDetail.tsx |
| `.tooltip-trigger` | attach hover interactions for glossary tooltips. | None |

## _elements.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.action-link` | for project actions, this formats the links | LabDetail.tsx |
| `.action-link .action-prefix` | be an icon or text prefix for action links. | LabDetail.tsx |
| `.gold-spacer` | gold space for separating sections | Home.tsx |
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
| `.f-clr-mutedass-muted` | apply a muted or secondary color to text. | showcase.tsx |
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
| `.mt-15px` | apply exact pixel-based margin-top values. | OpenSourceSection.tsx |
| `.mt-5px` | apply exact pixel-based margin-top values. | EraDetail.tsx |
| `.mt-60px` | apply exact pixel-based margin-top values. | LabDetail.tsx |
| `.mt-8px` | apply exact pixel-based margin-top values. | OpenSourceProjects.tsx |
| `.no-decor` | strip standard element decorations. | Archive.tsx, Articles.tsx, CareerSection.tsx, OpenSourceSection.tsx |
| `.pd-2rm` | apply a 2rem padding utility. | LinkModal.tsx |
| `.row-align-top` | force flex rows to align top and justify space-between. | OpenSourceProjects.tsx |
| `.row-justify-sb` | force flex rows to align top and justify space-between. | OpenSourceProjects.tsx |

## _forms.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.c-btn` | the standard interactive button component. | Contact.tsx, EraDetail.tsx, Home.tsx, LabDetail.tsx, ShowcaseDetail.tsx, case-study.tsx |
| `.c-contact-form` | the main wrapper for the contact form. | Contact.tsx |

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
| `.sidebar-li` | manage the specific styling, layout, and list structure of the global sidebar. | SidebarLinks.tsx |
| `.sidebar-logo` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-subtitle` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-title` | manage the specific styling, layout, and list structure of the global sidebar. | Sidebar.tsx |
| `.sidebar-ul` | manage the specific styling, layout, and list structure of the global sidebar. | SidebarLinks.tsx |

## _tags.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.tag` | shared tag control style. | Articles.tsx, CompanyCard.tsx, EraDetail.tsx, OpenSourceSection.tsx, Tags.tsx, UptimeModal.tsx |
| `.tag-wrapper` | a container for tags | LabDetail.tsx, Tags.tsx |

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
| `.f-clr-accent` | apply the primary accent color to text. | ArticlesSection.tsx, CareerSection.tsx, EraDetail.tsx, MoreFooter.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.f-clr-main` | apply the primary text color. | CaseStudies.tsx, showcase.tsx |
| `.f-clr-muted` | apply a muted or secondary color to text. | CareerSection.tsx, CompanyCard.tsx, OpenSourceSection.tsx |
| `.f-font-mono` | force a monospaced font family for technical data or labels. | LinkModal.tsx, UptimeModal.tsx |
| `.f-gold-bullet` | render list items with a custom gold bullet point. | LeadershipSection.tsx, ShowcaseDetail.tsx |
| `.f-hd-md` | apply medium and extra-small font sizes for headings. | CareerSection.tsx, CaseStudies.tsx, CompanyCard.tsx, showcase.tsx |
| `.f-hd-xs` | apply medium and extra-small font sizes for headings. | OpenSourceSection.tsx |
| `.f-label-mono` | force a monospaced font family for technical data or labels. | ArticlesSection.tsx, CareerSection.tsx, EraDetail.tsx, LeadershipSection.tsx, MoreFooter.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx |
| `.f-md-meta` | apply font sizing specifically optimized for metadata. | LinkModal.tsx, UptimeModal.tsx |
| `.f-meta-xs` | apply font sizing specifically optimized for metadata. | Archive.tsx, CaseStudies.tsx, OpenSourceProjects.tsx, showcase.tsx |
| `.f-mono-muted` | force a monospaced font family for technical data or labels. | ArticlesSection.tsx |
| `.f-mt-1` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-mt-2` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-mt-4` | apply typographic margin-top values. | LabDetail.tsx |
| `.f-no-decor` | strip standard browser text decoration (like underlines). | LinkModal.tsx |
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
| `.l-grid-2` | generate 2-column and 3-column CSS grid layouts. | Archive.tsx, Articles.tsx, ArticlesSection.tsx, LeadershipSection.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseDetail.tsx |
| `.l-grid-3` | generate 2-column and 3-column CSS grid layouts. | LeadershipSection.tsx, ShowcaseSection.tsx |
| `.l-grid-3 .l-grid-3.leadership-controls` | handle the specific layout requirements for the leadership view. | LeadershipSection.tsx |
| `.l-hero-intro` | structure the primary introduction/hero section. | Sidebar.tsx |
| `.l-leadership-node` | handle layout for specific leadership tree or chart nodes. | LeadershipSection.tsx |
| `.l-leadership-section` | handle layout for specific leadership tree or chart nodes. | LeadershipSection.tsx |
| `.l-scroll-y` | apply vertical scrolling to a container, mapping to `overflow-y-auto`. | app.tsx |
| `.l-showcase-grid` | dictate the grid layout for technical showcases. | ArticlesSection.tsx, CareerSection.tsx, CaseStudies.tsx, Era.tsx, Home.tsx, OpenSourceProjects.tsx, OpenSourceSection.tsx, ShowcaseSection.tsx, showcase.tsx |
| `.l-showcase-layout` | dictate the grid layout for technical showcases. | ShowcaseDetail.tsx |

## _shell.sass

| Class Path | Description | Files Using Tag |
| :--- | :--- | :--- |
| `.l-shell` | the foundational application shell containing the sidebar and main content. | app.tsx |

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
| `.l-nav-links.show` | shows the navigation links | NavBarLinks.tsx |
| `.l-nav-links.show .line` | highlight the active link | None |
| `.l-social-links` | lay out social media icons/links horizontally. | Sidebar.tsx |

