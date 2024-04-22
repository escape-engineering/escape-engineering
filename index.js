import { writeFileSync } from 'node:fs';
import Parser from 'rss-parser';

/**
 * README.MD
 */

let text = `# Hi there 👋

[![Tech Blog Badge](http://img.shields.io/badge/tistory-black?style=flat-square&logo=Tistory&link=https://codingpracticenote.tistory.com/)](https://codingpracticenote.tistory.com/)
	
[![Gmail Badge](https://img.shields.io/badge/Gmail-d14836?style=flat-square&logo=Gmail&logoColor=white&link=mailto:tkdrnr1215@gmail.com)](mailto:tkdrnr1215@gmail.com)

## 이런 환경에 익숙해요✍🏼

<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/> </t>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white"/> 
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"/>
<img src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"/>

## 📕 Latest Blog Posts

`;

// rss-parser 생성
const parser = new Parser({
    headers: {
        Accept: 'application/rss+xml, application/xml, text/xml; q=0.1',
    },
});

(async () => {
    // 피드 목록
    const feed = await parser.parseURL('https://codingpracticenote.tistory.com/rss');

    // 최신 5개의 글의 제목과 링크를 가져온 후 text에 추가
    for (let i = 0; i < 5; i++) {
        const { title, link } = feed.items[i];
        console.log(`${i + 1}번째 게시물`);
        console.log(`추가될 제목: ${title}`);
        console.log(`추가될 링크: ${link}`);
        text += `<a href=${link}>${title}</a></br>`;
    }

    // README.md 파일 작성
    writeFileSync('README.md', text, 'utf8', (e) => {
        console.log(e);
    });

    console.log('업데이트 완료');
})();
