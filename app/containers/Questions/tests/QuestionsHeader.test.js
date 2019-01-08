import createdHistory from 'createdHistory';
import QuestionsHeader, { askQuestion } from '../QuestionsHeader';

createdHistory.push = jest.fn();

const props = {
  translations: {},
  getInitQuestions: jest.fn(),
  communities: [],
};

describe('QuestionsHeader', () => {
  it('snapshot test', () => {
    expect(QuestionsHeader(props)).toMatchSnapshot();
  });

  it('askQuestion', () => {
    askQuestion();
    expect(createdHistory.push).toHaveBeenCalledWith('/questions/ask');
  });
});
