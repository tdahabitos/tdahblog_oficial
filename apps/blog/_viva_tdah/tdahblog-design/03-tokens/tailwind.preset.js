/**
 * TDAH.blog — Tailwind preset (JS puro)
 * Use no tailwind.config.js:
 *   presets: [require("./tdahblog-design/03-tokens/tailwind.preset")]
 *
 * Estratégia:
 * - CSS vars como fonte única
 * - Tailwind aponta para CSS vars
 */

module.exports = {
  theme: {
    extend: {
      colors: {
        surface: {
          0: "var(--color-semantic-surface-0)",
          1: "var(--color-semantic-surface-1)",
          2: "var(--color-semantic-surface-2)",
          3: "var(--color-semantic-surface-3)",
        },
        text: {
          primary: "var(--color-semantic-text-primary)",
          secondary: "var(--color-semantic-text-secondary)",
          muted: "var(--color-semantic-text-muted)",
          inverse: "var(--color-semantic-text-inverse)",
        },
        brand: {
          primary: "var(--color-semantic-brand-primary)",
          secondary: "var(--color-semantic-brand-secondary)",
          soft: "var(--color-semantic-brand-soft)",
          whisper: "var(--color-semantic-brand-whisper)",
        },
        border: {
          subtle: "var(--color-semantic-border-subtle)",
          default: "var(--color-semantic-border-default)",
          strong: "var(--color-semantic-border-strong)",
          focus: "var(--color-semantic-border-focus)",
        },
        semantic: {
          success: "var(--color-semantic-semantic-success)",
          warning: "var(--color-semantic-semantic-warning)",
          error: "var(--color-semantic-semantic-error)",
          info: "var(--color-semantic-semantic-info)",
        },
      },

      fontFamily: {
        editorial: ["var(--typography-fontFamily-editorial)", "serif"],
        ui: ["var(--typography-fontFamily-ui)", "sans-serif"],
      },

      fontSize: {
        h1: "var(--typography-fontSize-h1)",
        h2: "var(--typography-fontSize-h2)",
        h3: "var(--typography-fontSize-h3)",
        body: "var(--typography-fontSize-body)",
        small: "var(--typography-fontSize-small)",
      },

      lineHeight: {
        body: "var(--typography-lineHeight-body)",
        heading: "var(--typography-lineHeight-heading)",
      },

      borderRadius: {
        sm: "var(--radius-4)",
        md: "var(--radius-8)",
        lg: "var(--radius-12)",
        xl: "var(--radius-16)",
        "2xl": "var(--radius-24)",
        pill: "var(--radius-9999)",
      },

      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
      },

      spacing: {
        0: "var(--spacing-0)",
        4: "var(--spacing-4)",
        8: "var(--spacing-8)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
        20: "var(--spacing-20)",
        24: "var(--spacing-24)",
        28: "var(--spacing-28)",
        32: "var(--spacing-32)",
        36: "var(--spacing-36)",
        40: "var(--spacing-40)",
        44: "var(--spacing-44)",
        48: "var(--spacing-48)",
        56: "var(--spacing-56)",
        64: "var(--spacing-64)",
        72: "var(--spacing-72)",
        80: "var(--spacing-80)",
        88: "var(--spacing-88)",
        96: "var(--spacing-96)",
        104: "var(--spacing-104)",
        112: "var(--spacing-112)",
        120: "var(--spacing-120)",
        128: "var(--spacing-128)",
      },
    },
  },
};
