import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {remark} from 'remark'
import html from 'remark-html'

const postsDirctory = path.join(process.cwd(), 'posts')
export function getSortedPostsData() {
    const fileNames = fs.readdirSync(postsDirctory)
    const allPostsData = fileNames.map(fileName => {
        const id = fileName.replace(/\.md$/, '')
        const fullPath = path.join(postsDirctory, fileName)
        const fileContents = fs.readFileSync(fullPath, 'utf8')

        // use gray to parse the post metadata 
        const matterResult = matter(fileContents)
        return {
            id,
            ...matterResult.data
        }
    })
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return 1
        } else {
            return -1
        }
    })
}

export function getAllPostIds() {
    const fileNmaes = fs.readdirSync(postsDirctory)
    return fileNmaes.map(fileName => {
        return {
            params: {
                id: fileName.replace(/\.md$/, '')
            }
        }
    })
}

export async function getPostData(id) {
    const fullpath = path.join(postsDirctory, `${id}.md`)
    const fileContents = fs.readFileSync(fullpath, 'utf8')
    const matterResult = matter(fileContents)

    const processContent = await remark().use(html)
        .process(matterResult.content)
    const contentHtml = processContent.toString()

    return {
        id,
        contentHtml,
        ...matterResult.data
    }
}