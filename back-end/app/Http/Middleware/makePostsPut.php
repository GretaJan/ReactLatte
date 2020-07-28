<?php

namespace App\Http\Middleware;

use Closure;

class makePostsPut
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $request->setMethod('PATCH');
        return $next($request);
    }
}
