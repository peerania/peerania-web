import { SECTION_ID } from 'containers/Faq/constants';
import { getMD, getSectionCode, getQuestionCode } from '../mdManagement';

jest.mock(
  'faq/en.md',
  () =>
    `
<h1>H1</h1>
<h2>H2</h2>
<h3>H3</h3>
<p>Prgr</p>
`,
);

describe('getFaq', () => {
  const expected = {
    blocks: [
      {
        blocks: [
          {
            content: '<p>Prgr</p>',
            h3: 'H3',
            questionCode: 0,
          },
        ],
        h2: 'H2',
        sectionCode: 0,
      },
    ],
    h1: 'H1',
  };

  it('test', () => {
    expect(getMD('faq', 'en')).toEqual(expected);
  });
});

describe('getSectionCode', () => {
  const sectionIndex = 0;
  const sectionCode = getSectionCode(SECTION_ID, sectionIndex);

  it('test', () => {
    expect(sectionCode).toBe(`${SECTION_ID}_${sectionIndex}`);
  });
});

describe('getQuestionCode', () => {
  const sectionIndex = 0;
  const questionIndex = 0;
  const questionCode = getQuestionCode(SECTION_ID, sectionIndex, questionIndex);

  it('test', () => {
    expect(questionCode).toBe(`${SECTION_ID}_${sectionIndex}_${questionIndex}`);
  });
});
