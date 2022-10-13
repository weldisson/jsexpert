const { readFile } = require('fs/promises')
const UserMapper = require('./UserMapper')
const { error }  = require('./enums')

const DEFAULT_OPTION = {
    maxLines: 3, 
    fields: [ 'id', 'name', 'profession', 'age']
}

class File {
    static async csvToJson(filePath) {
        const content = await File.getFileContent(filePath);
        const validation = File.isValid(content)
        if(!validation.valid) throw new Error(validation.error)
        const users = File.parseCSVToJSON(content);
        return users;
    }

    static  async getFileContent(filePath) {
        // const filename = join(__dirname, filePath)
        return (await readFile(filePath)).toString('utf8')
    }

    static isValid(csvString, option = DEFAULT_OPTION) {
        const [header, ...fileContent] = csvString.split('\n')
        const isHeaderValid = header === option.fields.join(',')
        if(!isHeaderValid) {
            return {
                error: error.FILE_FIELDS_ERROR_MESSAGE,
                valid: false
            }
        }

        const isContentLengthAccepted = (
            fileContent.length > 0 &&
            fileContent.length <= option.maxLines
        )

        if(!isContentLengthAccepted) {
            return {
                error: error.FILE_LENGTH_ERROR_MESSAGE,
                valid: false
            }
        }

        return { valid: true}
    }

    static parseCSVToJSON(csvString) {
        const lines = csvString.split('\n')
        const firstLine = lines.shift() //remove o primeiro elemento de um array e retorna esse elemento.
        const header = firstLine.split(',')
        const users = lines.map(line => {
            const columns = line.split(',')
            let user = {}
            for (const prop in columns) {
                user[header[prop]] = columns[prop]
            }

            return new UserMapper(user);
        })

        return users
    }
}

module.exports = File;