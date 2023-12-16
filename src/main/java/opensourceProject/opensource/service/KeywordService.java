package opensourceProject.opensource.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import opensourceProject.opensource.domain.Keyword;
//import opensourceProject.opensource.domain.KeywordId; // 변경된 부분

import opensourceProject.opensource.repository.KeywordRepository;

@Service
@Transactional
public class KeywordService {
    private final KeywordRepository keywordRepository;

    public KeywordService(KeywordRepository keywordRepository) {
        this.keywordRepository = keywordRepository;
    }

    // 필터링 단어 추가
    public String join(Keyword keyword) {

        try {
            validateDuplicateKeyword(keyword);
            keywordRepository.save(keyword);
            return "success";
        } catch (IllegalStateException e) {
            // 중복 예외 발생 시 처리
            return "duplicate"; // 중복된 경우를 프론트엔드로 알림
        }
    }

    // 필터링 중복 검사
    private void validateDuplicateKeyword(Keyword keyword) {
        keywordRepository.findByWord(keyword.getWord())
                .ifPresent(m -> {
                    throw new IllegalStateException("이미 등록한 키워드 입니다.");
                });
    }

    // 필터링 단어 조회
    public List<Keyword> findAllKeywords() {
        return keywordRepository.findAll();
    }

    public void dropAllKeywords() {
        keywordRepository.deleteAll();
    }
}
