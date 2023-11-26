package opensourceProject.opensource.repository;

import java.util.List;
import java.util.Optional;
import opensourceProject.opensource.domain.Keyword;

public interface KeywordRepository {
    Keyword save(Keyword keyword);

    Optional<Keyword> findById(String id);// 아이디 찾아오기

    Optional<Keyword> findByWord(String id, String word);// 필터링 키워드 찾아오기

    void deleteByWord(String id, String word);

    List<Keyword> findAll(); // 모든 거 출력
}
