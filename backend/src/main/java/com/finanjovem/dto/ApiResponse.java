package com.finanjovem.dto;

public class ApiResponse<T> {

    private boolean success;
    private String message;
    private T data;
    private Integer count;
    private ResumoFinanceiro resumo;

    public static <T> ApiResponse<T> ok(T data) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = true;
        r.data = data;
        return r;
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        ApiResponse<T> r = ok(data);
        r.message = message;
        return r;
    }

    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> r = new ApiResponse<>();
        r.success = false;
        r.message = message;
        return r;
    }

    public boolean isSuccess() { return success; }
    public String getMessage() { return message; }
    public T getData() { return data; }
    public Integer getCount() { return count; }
    public ResumoFinanceiro getResumo() { return resumo; }

    public void setCount(Integer count) { this.count = count; }
    public void setResumo(ResumoFinanceiro resumo) { this.resumo = resumo; }
}
