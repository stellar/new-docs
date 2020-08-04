module.exports = {
  extends: ["@stellar/eslint-config"],
  ignorePatterns: ["**/_this_is_virtual_fs_path_/**/*"],
  rules: {
    "import/no-unresolved": 0,
  },
};
