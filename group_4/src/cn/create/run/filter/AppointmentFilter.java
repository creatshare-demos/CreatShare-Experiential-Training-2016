package cn.create.run.filter;

import java.io.IOException;
import java.util.List;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;

import cn.create.run.appiontment.domain.Appiontment;

/**
 * Servlet Filter implementation class AppointmentFilter
 */
public class AppointmentFilter implements Filter {

    /**
     * Default constructor. 
     */
    public AppointmentFilter() {
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Filter#destroy()
	 */
	public void destroy() {
		// TODO Auto-generated method stub
	}

	/**
	 * @see Filter#doFilter(ServletRequest, ServletResponse, FilterChain)
	 */
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
		List<Appiontment> appiontments = (List<Appiontment>) request.getAttribute("appointments");
		if(appiontments == null){
			request.getRequestDispatcher("/AppiontmentServlet?method=getApps").forward(request, response);
		}else{
			chain.doFilter(request, response);
		}
	}

	/**
	 * @see Filter#init(FilterConfig)
	 */
	public void init(FilterConfig fConfig) throws ServletException {
		// TODO Auto-generated method stub
	}

}
