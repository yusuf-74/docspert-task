const csvLikeReader = async (file, validation) => {
        if (!file) {
            validation.setFieldValue("accounts", [])
            return
        }
        const data = await file.arrayBuffer();
        const text = new TextDecoder().decode(data).replace(/\r/g, "");
        const headers = text.split("\n")[0].split(",").map(header => header.trim().toLowerCase())
        const accounts = text.split("\n").map(account => {
            const accountObj = {}
            account.split(",").forEach((value, index) => {
                accountObj[headers[index]] = value.trim()
            })
            return accountObj
        })
        accounts.shift()
        accounts.pop()
        validation.setFieldValue("accounts", accounts)
};

export default csvLikeReader;