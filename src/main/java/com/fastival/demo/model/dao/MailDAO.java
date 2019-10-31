package com.fastival.demo.model.dao;

import com.fastival.demo.model.dto.MailDTO;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;
import java.util.Map;

public interface MailDAO {

    @Insert("insert into tb_mail_certification (mail_address, mail_key) values (#{mail_address}, #{mail_key})")
    public void insertMailCertification(MailDTO dto);

    @Select("select mail_no, count(*) from tb_mail_certification where mail_address = #{mail_address} and mail_key = #{mail_key} and mail_state = #{mail_state}")
    public Map<String,Object> selectCheckCount(MailDTO dto);

    @Update("update tb_mail_certification set mail_state = #{mail_state} where mail_no = #{mail_no}")
    public void updateMailCertification(MailDTO dto);

}
