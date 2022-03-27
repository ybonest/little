const {
    override,
    fixBabelImports,
    setWebpackTarget,
} = require("customize-cra");
const path = require("path");

module.exports = override(
    // add an alias for "page" imports
    // addWebpackAlias({
    //     page: path.resolve(__dirname, "src/page")
    // }),
    fixBabelImports("import", {
        libraryName: "antd",
        libraryDirectory: "es",
        style: true,
    }),
    setWebpackTarget('electron-main')
);