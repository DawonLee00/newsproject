package opensourceProject.opensource.service;

import java.util.List;

import org.springframework.transaction.annotation.Transactional;

import opensourceProject.opensource.domain.Keyword;
import opensourceProject.opensource.repository.KeywordRepository;

@Transactional
public class KeywordService {
    private final KeywordRepository keywordRepository;

    public KeywordService(KeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
    }

    // 필터링 단어 추가
    public String join(Keyword keyword) {

        validateDuplicateKeyword(keyword);

        keywordRepository.save(keyword);
        return keyword.getId();
    }

    // 필터링 중복 검사
    private void validateDuplicateKeyword(Keyword keyword) {
        keywordRepository.findByWord(keyword.getId(), keyword.getWord())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 등록한 키워드 입니다.");
                });
    }

    // 필터링 단어 조회
    public List<Keyword> findKeyword() {
        return keywordRepository.findAll();
    }

    // 필터링 단어 삭제
    public void drop(Keyword keyword) {
        isPresentKeyword(keyword);
    }

    // 필터링 존재 검사
    private void isPresentKeyword(Keyword keyword) {
        keywordRepository.findByWord(keyword.getId(), keyword.getWord())
                .ifPresent(m -> {
                    keywordRepository.deleteByWord(keyword.getId(), keyword.getWord());
                });
    }
}
